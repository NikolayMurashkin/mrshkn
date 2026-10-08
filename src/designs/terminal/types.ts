import type { BriefChoice } from '@/lib/brief/types';

/** Строка панели build.log в hero Terminal. */
export type TerminalLogLine = {
  /** Ключ текста строки в `hero.terminal.log`. */
  key: 'brief' | 'prepayment' | 'concept' | 'staging' | 'lighthouse' | 'handover' | 'warranty';
  /** Номер дня в квадратных скобках; null — строка без дня (гарантия). */
  day: string | null;
  /** Статус в конце строки: `ok` зеленым, `active` акцентом с курсором. */
  status: 'ok' | 'active';
};

export type TerminalChoicesProps = {
  field: BriefChoice;
  values: readonly string[];
  selected: string;
  labelOf: (value: string) => string;
  onPick: (field: BriefChoice, value: string) => void;
};

export type TerminalDesignChoiceProps = {
  selected: string;
  onPick: (field: BriefChoice, value: string) => void;
  labelOf: (value: string) => string;
};
