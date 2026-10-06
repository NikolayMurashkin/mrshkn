'use client';

import { Brief } from '@/components/Brief/Brief';
import { BriefThanks } from '@/components/Brief/BriefThanks';
import { renderSection } from '../render';
import type { DesignComponents, SectionProps } from '../types';
import './fonts';
import { TerminalCase } from './Case';
import { TerminalFooter } from './Footer';
import { TerminalHeader } from './Header';
import { TerminalHero } from './Hero';
import { TerminalPricing } from './Pricing';
import { TerminalProcess } from './Process';
import { TerminalWorks } from './Works';

const COMPONENTS: DesignComponents = {
  header: TerminalHeader,
  hero: TerminalHero,
  pricing: TerminalPricing,
  works: TerminalWorks,
  process: TerminalProcess,
  case: TerminalCase,
  footer: TerminalFooter,
  brief: Brief,
  briefThanks: BriefThanks,
};

export const TerminalSection = (props: SectionProps) => renderSection(COMPONENTS, props);
