import { spawnSync } from 'node:child_process';

const DESIGNS = ['kinetic', 'terminal', 'pop', 'swiss', 'editorial'];

const lhci = (design, ...args) => {
  const result = spawnSync('yarn', ['lhci', ...args], {
    stdio: 'inherit',
    env: { ...process.env, LIGHTHOUSE_DESIGN: design },
  });

  return result.status === 0;
};

// Первый прогон на свежем раннере измеряет холодный Chrome и Node, а не сайт: TBT там в 3–4 раза
// выше остальных. Прогревочный прогон не попадает ни в assert, ни в отчеты. Прогрев упал — сервер
// не поднялся, и пять замеров упали бы так же, только дольше → выход сразу.
console.log('\n=== Lighthouse CI: warm-up (не учитывается) ===');

if (!lhci(DESIGNS[0], 'collect', '--numberOfRuns=1')) {
  console.error('\nLighthouse CI: прогрев упал, замеры не запускались');
  process.exit(1);
}

// Провал одного направления не прячет замеры остальных (D4): меряются все, список упавших — в конце.
const failed = [];

for (const design of DESIGNS) {
  console.log(`\n=== Lighthouse CI: ${design} ===`);

  if (!lhci(design, 'autorun')) {
    failed.push(design);
  }
}

if (failed.length > 0) {
  console.error(`\nLighthouse CI: упали направления: ${failed.join(', ')}`);
  process.exit(1);
}
