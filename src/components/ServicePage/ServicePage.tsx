'use client';

import dynamic from 'next/dynamic';

/**
 * Общая верстка страницы услуги грузится своим чанком: три направления делят ее таблицу секций, и со статическим
 * импортом Turbopack слил бы в один CSS-чанк стили всех трех направлений — а каждое должно тянуть только свои.
 */
export const ServicePage = dynamic(() => import('./ServicePageView').then((module) => module.ServicePageView));
