import {
  EDITORIAL_LEAD_COVER_SIZES,
  EDITORIAL_ROW_COVER_SIZES,
  EDITORIAL_SIDE_COVER_SIZES,
  EDITORIAL_SPREAD_SIZE,
  EDITORIAL_WORKS_LAYOUTS,
  EDITORIAL_WORKS_SPREAD,
} from './consts';
import type { EditorialProgressState, EditorialWorksLayout } from './types';

export const progressState = (index: number, step: number): EditorialProgressState => {
  if (index < step) {
    return 'done';
  }

  return index === step ? 'current' : 'todo';
};

export const worksLayout = (count: number): EditorialWorksLayout =>
  count in EDITORIAL_WORKS_LAYOUTS
    ? EDITORIAL_WORKS_LAYOUTS[count as keyof typeof EDITORIAL_WORKS_LAYOUTS]
    : EDITORIAL_WORKS_SPREAD;

/** `sizes` обложки по месту материала в раскладке: главный, боковой в развороте или ряд по два с четвертого. */
export const coverSizes = (index: number): string => {
  if (index === 0) {
    return EDITORIAL_LEAD_COVER_SIZES;
  }

  return index < EDITORIAL_SPREAD_SIZE ? EDITORIAL_SIDE_COVER_SIZES : EDITORIAL_ROW_COVER_SIZES;
};
