'use client';

import dynamic from 'next/dynamic';

/**
 * Общая верстка страницы услуги грузится своим чанком: со статическим импортом Turbopack слил бы ее CSS с чанком
 * направления, которое ее берет, — а оно должно тянуть только свои стили.
 */
export const ServicePage = dynamic(() => import('./ServicePageView').then((module) => module.ServicePageView));
