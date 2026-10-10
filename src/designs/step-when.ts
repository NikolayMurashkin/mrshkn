import { STEP_WHEN_PATTERN } from './consts';
import type { StepWhen } from './types';

export const splitStepWhen = (when: string): StepWhen => {
  const match = when.trim().match(STEP_WHEN_PATTERN);

  if (!match) {
    return { label: when, value: null };
  }

  return { label: match[1], value: match[2] };
};
