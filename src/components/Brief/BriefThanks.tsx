'use client';

import dynamic from 'next/dynamic';

/** Свой чанк по той же причине, что у `Brief`: общий CSS не должен склеивать чанки направлений. */
export const BriefThanks = dynamic(() => import('./BriefThanksView').then((module) => module.BriefThanksView));
