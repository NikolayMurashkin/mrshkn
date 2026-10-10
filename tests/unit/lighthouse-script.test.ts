import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { chmodSync, closeSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const ROOT = path.resolve(import.meta.dirname, '../..');
const DESIGNS = ['kinetic', 'terminal', 'pop', 'swiss', 'editorial'];
const MARKER = 'FAKE-LHCI ';
const WARMUP = 'kinetic collect --numberOfRuns=1';

const FAKE_YARN = `#!/bin/sh
if [ "$1" = "lhci" ]; then
  shift
fi
printf '%s %s\\n' "$LIGHTHOUSE_DESIGN" "$*" >> "$FAKE_LHCI_LOG"
printf 'FAKE-LHCI %s %s\\n' "$LIGHTHOUSE_DESIGN" "$*"
for arg in "$@"; do
  if [ "$arg" = "autorun" ]; then
    case ",$FAKE_LHCI_KILL," in
      *",$LIGHTHOUSE_DESIGN,"*) kill -9 $$ ;;
    esac
    case ",$FAKE_LHCI_FAIL," in
      *",$LIGHTHOUSE_DESIGN,"*) exit 1 ;;
    esac
  fi
  if [ "$arg" = "collect" ] && [ "$FAKE_LHCI_FAIL_WARMUP" = "1" ]; then
    exit 1
  fi
done
exit 0
`;

type FakeEnv = {
  FAKE_LHCI_FAIL?: string;
  FAKE_LHCI_KILL?: string;
  FAKE_LHCI_FAIL_WARMUP?: string;
};

type Run = {
  result: SpawnSyncReturns<Buffer>;
  calls: string[];
  autoruns: string[];
  tail: string;
};

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'lighthouse-script-'));
  const yarn = path.join(dir, 'yarn');

  writeFileSync(yarn, FAKE_YARN);
  chmodSync(yarn, 0o755);
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const runScript = (fake: FakeEnv): Run => {
  const logPath = path.join(dir, 'lhci.log');
  const outputPath = path.join(dir, 'output.txt');
  const env: NodeJS.ProcessEnv = { ...process.env };

  delete env.FAKE_LHCI_FAIL;
  delete env.FAKE_LHCI_KILL;
  delete env.FAKE_LHCI_FAIL_WARMUP;
  delete env.LIGHTHOUSE_DESIGN;

  writeFileSync(logPath, '');
  const fd = openSync(outputPath, 'w');

  let result: SpawnSyncReturns<Buffer>;

  try {
    result = spawnSync(process.execPath, ['scripts/lighthouse.mjs'], {
      cwd: ROOT,
      stdio: ['ignore', fd, fd],
      env: {
        ...env,
        ...fake,
        PATH: `${dir}${path.delimiter}${process.env.PATH ?? ''}`,
        FAKE_LHCI_LOG: logPath,
      },
    });
  } finally {
    closeSync(fd);
  }

  const calls = readFileSync(logPath, 'utf8').split('\n').filter(Boolean);
  const autoruns = calls
    .map((line) => line.split(' '))
    .filter((parts) => parts.slice(1).includes('autorun'))
    .map((parts) => parts[0]);
  const output = readFileSync(outputPath, 'utf8');
  const lastMarker = output.lastIndexOf(MARKER);
  const markerLineEnd = output.indexOf('\n', lastMarker);
  const tail = lastMarker === -1 ? output : markerLineEnd === -1 ? '' : output.slice(markerLineEnd + 1);

  return { result, calls, autoruns, tail };
};

const nameIn = (text: string, name: string) => new RegExp(`\\b${name}\\b`).test(text);

const expectNonZeroExit = (result: SpawnSyncReturns<Buffer>) => {
  expect(result.signal).toBeNull();
  expect(result.status).not.toBe(0);
};

describe('scripts/lighthouse.mjs', () => {
  it.each(['kinetic', 'swiss', 'editorial'])(
    'при провале %s меряет все направления и в конце печатает список упавших',
    (failed) => {
      const { result, autoruns, tail } = runScript({ FAKE_LHCI_FAIL: failed });

      expect(autoruns).toEqual(DESIGNS);
      expectNonZeroExit(result);
      expect(nameIn(tail, failed)).toBe(true);

      for (const green of DESIGNS.filter((design) => design !== failed)) {
        expect(nameIn(tail, green), `зеленое направление ${green} в списке упавших`).toBe(false);
      }
    },
  );

  it('при провале двух направлений печатает оба в порядке замера', () => {
    const { result, autoruns, tail } = runScript({ FAKE_LHCI_FAIL: 'pop,editorial' });

    expect(autoruns).toEqual(DESIGNS);
    expectNonZeroExit(result);
    expect(nameIn(tail, 'pop')).toBe(true);
    expect(nameIn(tail, 'editorial')).toBe(true);
    expect(tail.search(/\bpop\b/)).toBeLessThan(tail.search(/\beditorial\b/));

    for (const green of ['kinetic', 'terminal', 'swiss']) {
      expect(nameIn(tail, green), `зеленое направление ${green} в списке упавших`).toBe(false);
    }
  });

  it('lhci, убитый сигналом, считается провалом направления', () => {
    const { result, autoruns, tail } = runScript({ FAKE_LHCI_KILL: 'pop' });

    expect(autoruns).toEqual(DESIGNS);
    expectNonZeroExit(result);
    expect(nameIn(tail, 'pop')).toBe(true);

    for (const green of ['kinetic', 'terminal', 'swiss', 'editorial']) {
      expect(nameIn(tail, green), `зеленое направление ${green} в списке упавших`).toBe(false);
    }
  });

  it('при всех зеленых завершается с кодом 0 после прогрева и пяти замеров', () => {
    const { result, calls } = runScript({});

    expect(result.signal).toBeNull();
    expect(result.status).toBe(0);
    expect(calls).toEqual([WARMUP, ...DESIGNS.map((design) => `${design} autorun`)]);
  });

  it('провал прогрева останавливает скрипт до замеров', () => {
    const { result, calls, autoruns } = runScript({ FAKE_LHCI_FAIL_WARMUP: '1' });

    expectNonZeroExit(result);
    expect(calls).toEqual([WARMUP]);
    expect(autoruns).toEqual([]);
  });
});
