import { POP_STEP_WHEN_PATTERN } from './consts';
import type { PopStepWhen } from './types';

export const splitStepWhen = (when: string): PopStepWhen => {
  const match = when.trim().match(POP_STEP_WHEN_PATTERN);

  if (!match) {
    return { label: when, value: null };
  }

  return { label: match[1], value: match[2] };
};
