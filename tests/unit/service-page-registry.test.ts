import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ServicePage } from '@/components/ServicePage/ServicePage';
import { SECTION_NAMES } from '@/designs/consts';
import { EditorialSection } from '@/designs/editorial';
import { KineticSection } from '@/designs/kinetic';
import { PopSection } from '@/designs/pop';
import { SwissSection } from '@/designs/swiss';
import { TerminalSection } from '@/designs/terminal';
import type { SectionProps } from '@/designs/types';

vi.mock('next/font/local', () => ({ default: () => ({ className: '', style: {}, variable: '' }) }));

const SHARED_DESIGNS = [
  ['terminal', TerminalSection],
  ['pop', PopSection],
  ['swiss', SwissSection],
  ['editorial', EditorialSection],
] as const;

const servicePageProps = (service: string) => ({ section: 'servicePage', service }) as unknown as SectionProps;

describe('секция страницы услуги в реестре направлений', () => {
  it('в SECTION_NAMES есть servicePage', () => {
    expect(SECTION_NAMES).toContain('servicePage');
  });

  it('Kinetic отдает для servicePage свой компонент, а не общий ServicePage', () => {
    const element = KineticSection(servicePageProps('landing')) as ReactElement;

    expect(typeof element.type).toBe('function');
    expect(element.type).not.toBe(ServicePage);
    expect(element.props).toMatchObject({ service: 'landing' });
  });

  it.each(SHARED_DESIGNS)('%s отдает для servicePage общий ServicePage', (_design, Section) => {
    const element = Section(servicePageProps('miniApp')) as ReactElement;

    expect(element.type).toBe(ServicePage);
    expect(element.props).toEqual({ service: 'miniApp' });
  });
});
