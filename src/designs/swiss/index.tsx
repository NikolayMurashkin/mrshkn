'use client';

import { Brief } from '@/components/Brief/Brief';
import { BriefThanks } from '@/components/Brief/BriefThanks';
import { ServicePage } from '@/components/ServicePage/ServicePage';
import { renderSection } from '../render';
import type { DesignComponents, SectionProps } from '../types';
import './fonts';
import { SwissCase } from './Case';
import { SwissFooter } from './Footer';
import { SwissHeader } from './Header';
import { SwissHero } from './Hero';
import { SwissPricing } from './Pricing';
import { SwissProcess } from './Process';
import { SwissWorks } from './Works';

const COMPONENTS: DesignComponents = {
  header: SwissHeader,
  hero: SwissHero,
  pricing: SwissPricing,
  works: SwissWorks,
  process: SwissProcess,
  case: SwissCase,
  footer: SwissFooter,
  brief: Brief,
  briefThanks: BriefThanks,
  servicePage: ServicePage,
};

export const SwissSection = (props: SectionProps) => renderSection(COMPONENTS, props);
