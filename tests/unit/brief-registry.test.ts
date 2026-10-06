import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Brief } from '@/components/Brief/Brief';
import { BriefThanks } from '@/components/Brief/BriefThanks';
import { BriefThanksView } from '@/components/Brief/BriefThanksView';
import { BriefView } from '@/components/Brief/BriefView';
import { SECTION_NAMES } from '@/designs/consts';
import { EditorialSection } from '@/designs/editorial';
import { KineticSection } from '@/designs/kinetic';
import { PopSection } from '@/designs/pop';
import { SwissSection } from '@/designs/swiss';
import { TerminalSection } from '@/designs/terminal';

vi.mock('next/font/local', () => ({ default: () => ({ className: '', style: {}, variable: '' }) }));

const SHARED_DESIGNS = [
  ['terminal', TerminalSection],
  ['pop', PopSection],
  ['swiss', SwissSection],
  ['editorial', EditorialSection],
] as const;

describe('секции квиза в реестре направлений', () => {
  it('Kinetic отдает для brief свой компонент, а не общий Brief', () => {
    const element = KineticSection({ section: 'brief', design: 'kinetic', plan: null }) as ReactElement;

    expect(typeof element.type).toBe('function');
    expect(element.type).not.toBe(Brief);
    expect(element.type).not.toBe(BriefView);
    expect(element.props).toMatchObject({ design: 'kinetic', plan: null });
  });

  it('Kinetic отдает для briefThanks свой компонент, а не общий BriefThanks', () => {
    const element = KineticSection({ section: 'briefThanks' }) as ReactElement;

    expect(typeof element.type).toBe('function');
    expect(element.type).not.toBe(BriefThanks);
    expect(element.type).not.toBe(BriefThanksView);
  });

  it.each(SHARED_DESIGNS)('%s отдает для brief общий Brief с предвыбором', (design, Section) => {
    const element = Section({ section: 'brief', design, plan: 'miniApp' }) as ReactElement;

    expect(element.type).toBe(Brief);
    expect(element.props).toEqual({ design, plan: 'miniApp' });
  });

  it.each(SHARED_DESIGNS)('%s отдает для briefThanks общий BriefThanks', (_design, Section) => {
    const element = Section({ section: 'briefThanks' }) as ReactElement;

    expect(element.type).toBe(BriefThanks);
  });

  it('в SECTION_NAMES есть brief и briefThanks', () => {
    expect(SECTION_NAMES).toContain('brief');
    expect(SECTION_NAMES).toContain('briefThanks');
  });
});
