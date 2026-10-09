import type { BriefChoice } from '@/lib/brief/types';

/** Инлайновая иконка Swiss: стрелки и солнце — SVG 24×24 с квадратными концами, а не глиф (↗ нет в сабсете Geologica). */
export type SwissIconProps = {
  size?: number;
  className?: string;
};

export type SwissChoicesProps = {
  field: BriefChoice;
  values: readonly string[];
  selected: string;
  labelOf: (value: string) => string;
  onPick: (field: BriefChoice, value: string) => void;
};

export type SwissDesignChoiceProps = {
  selected: string;
  onPick: (field: BriefChoice, value: string) => void;
  labelOf: (value: string) => string;
};

/** Состояние сегмента прогресса квиза: пройден, текущий, впереди. */
export type SwissProgressState = 'done' | 'current' | 'todo';
