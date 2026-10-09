import type { BriefChoice } from '@/lib/brief/types';

/** Размер инлайновой иконки Pop: стрелки и звезда рисуются SVG, а не глифом — у Rubik нет стрелок. */
export type PopIconProps = {
  size?: number;
  className?: string;
};

export type PopChoicesProps = {
  field: BriefChoice;
  values: readonly string[];
  selected: string;
  labelOf: (value: string) => string;
  onPick: (field: BriefChoice, value: string) => void;
};

export type PopDesignChoiceProps = {
  selected: string;
  onPick: (field: BriefChoice, value: string) => void;
  labelOf: (value: string) => string;
};

/** Цвет фишки по циклу Pop: желтая, коралловая, фиолетовая, ink. */
export type PopTone = 1 | 2 | 3 | 4;
