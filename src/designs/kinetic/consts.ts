import { PROCESS_STEPS } from '@/content/process';

export const KINETIC_TICKER_ITEMS = ['landing', 'miniApps', 'company', 'shops', 'mvp', 'support'] as const;

export const KINETIC_TAPE_PROMISES = [
  'hero.kinetic.tapeCode',
  'process.promises.deadline.detail',
  'process.promises.warranty.value',
] as const;

/** Сколько раз список пунктов повторяется на ленте: хватает на ширину 1920 и на половину цикла `translateX(-50%)`. */
export const KINETIC_TAPE_REPEAT = 4;

export const KINETIC_BADGE_SIZE = 260;

export const KINETIC_BADGE_RING_RADIUS = 100;

export const KINETIC_BADGE_RING_LENGTH = Math.round(2 * Math.PI * KINETIC_BADGE_RING_RADIUS);

export const KINETIC_FOUNDED_YEAR = 2026;

export const KINETIC_STUDIO_EMAIL = 'hello@mrshkn.com';

export const KINETIC_AXIS_DAYS = 14;

export const KINETIC_SCROLL_BAND = '-35% 0px -55% 0px';

export const KINETIC_BADGE_CENTER = KINETIC_BADGE_SIZE / 2;

export const KINETIC_AXIS = Array.from({ length: KINETIC_AXIS_DAYS }, (_, index) => index + 1);

export const KINETIC_KEY_DAYS: readonly number[] = PROCESS_STEPS.map((step) => step.day);
