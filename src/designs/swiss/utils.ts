import { SWISS_COUNT_DIGITS } from './consts';
import type { SwissProgressState } from './types';

export const progressState = (index: number, step: number): SwissProgressState => {
  if (index < step) {
    return 'done';
  }

  return index === step ? 'current' : 'todo';
};

export const padCount = (value: number) => String(value).padStart(SWISS_COUNT_DIGITS, '0');
