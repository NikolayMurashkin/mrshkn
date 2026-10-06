'use client';

import dynamic from 'next/dynamic';

/**
 * Общая верстка квиза грузится своим чанком: четыре направления делят ее таблицу секций, и со статическим
 * импортом Turbopack слил бы в один CSS-чанк стили всех четырех направлений — а каждое должно тянуть только свои.
 */
export const Brief = dynamic(() => import('./BriefView').then((module) => module.BriefView));
