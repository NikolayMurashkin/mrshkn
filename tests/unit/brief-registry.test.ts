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

const OWN_DESIGNS = [
  ['kinetic', KineticSection],
  ['terminal', TerminalSection],
  ['pop', PopSection],
] as const;

const SHARED_DESIGNS = [
  ['swiss', SwissSection],
  ['editorial', EditorialSection],
] as const;

const briefType = (Section: (typeof OWN_DESIGNS)[number][1], design: (typeof OWN_DESIGNS)[number][0]) =>
  (Section({ section: 'brief', design, plan: null }) as ReactElement).type;

const thanksType = (Section: (typeof OWN_DESIGNS)[number][1]) =>
  (Section({ section: 'briefThanks' }) as ReactElement).type;

describe('секции квиза в реестре направлений', () => {
  it.each(OWN_DESIGNS)('%s отдает для brief свой компонент, а не общий Brief', (design, Section) => {
    const element = Section({ section: 'brief', design, plan: null }) as ReactElement;
    const others = OWN_DESIGNS.filter(([name]) => name !== design);

    expect(element.type).not.toBe(Brief);
    expect(element.type).not.toBe(BriefView);
    expect(typeof element.type).toBe('function');
    expect(element.props).toMatchObject({ design, plan: null });
    for (const [otherDesign, OtherSection] of others) {
      expect(element.type).not.toBe(briefType(OtherSection, otherDesign));
    }
  });

  it.each(OWN_DESIGNS)('%s отдает для briefThanks свой компонент, а не общий BriefThanks', (design, Section) => {
    const element = Section({ section: 'briefThanks' }) as ReactElement;
    const others = OWN_DESIGNS.filter(([name]) => name !== design);

    expect(element.type).not.toBe(BriefThanks);
    expect(element.type).not.toBe(BriefThanksView);
    expect(typeof element.type).toBe('function');
    for (const [, OtherSection] of others) {
      expect(element.type).not.toBe(thanksType(OtherSection));
    }
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
