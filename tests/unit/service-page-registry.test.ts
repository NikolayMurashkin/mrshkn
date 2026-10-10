import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ServicePage } from '@/components/ServicePage/ServicePage';
import { ServicePageView } from '@/components/ServicePage/ServicePageView';
import { SECTION_NAMES } from '@/designs/consts';
import { EditorialSection } from '@/designs/editorial';
import { KineticSection } from '@/designs/kinetic';
import { PopSection } from '@/designs/pop';
import { SwissSection } from '@/designs/swiss';
import { TerminalSection } from '@/designs/terminal';
import type { SectionProps } from '@/designs/types';

vi.mock('next/font/local', () => ({ default: () => ({ className: '', style: {}, variable: '' }) }));

const OWN_DESIGNS = [
  ['kinetic', KineticSection],
  ['terminal', TerminalSection],
  ['pop', PopSection],
  ['swiss', SwissSection],
] as const;

const SHARED_DESIGNS = [['editorial', EditorialSection]] as const;

const servicePageProps = (service: string) => ({ section: 'servicePage', service }) as unknown as SectionProps;

describe('секция страницы услуги в реестре направлений', () => {
  it('в SECTION_NAMES есть servicePage', () => {
    expect(SECTION_NAMES).toContain('servicePage');
  });

  it.each(OWN_DESIGNS)('%s отдает для servicePage свой компонент, а не общий ServicePage', (design, Section) => {
    const element = Section(servicePageProps('landing')) as ReactElement;
    const others = OWN_DESIGNS.filter(([name]) => name !== design);

    expect(element.type).not.toBe(ServicePage);
    expect(element.type).not.toBe(ServicePageView);
    expect(typeof element.type).toBe('function');

    for (const [other, OtherSection] of others) {
      const otherType = (OtherSection(servicePageProps('landing')) as ReactElement).type;

      expect(element.type, `компонент ${other}`).not.toBe(otherType);
    }

    expect(element.props).toMatchObject({ service: 'landing' });
  });

  it.each(SHARED_DESIGNS)('%s отдает для servicePage общий ServicePage', (_design, Section) => {
    const element = Section(servicePageProps('miniApp')) as ReactElement;

    expect(element.type).toBe(ServicePage);
    expect(element.props).toEqual({ service: 'miniApp' });
  });
});
