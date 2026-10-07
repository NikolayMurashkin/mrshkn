import { describe, expect, it } from 'vitest';
import { PRICING_PLANS } from '@/content/pricing';
import { serviceFaqJsonLd } from '@/content/services';
import type { FaqItem, ServiceMessages } from '@/content/types';
import en from '../../messages/en.json';
import ru from '../../messages/ru.json';

const MESSAGES: Record<string, ServiceMessages> = { ru: ru as ServiceMessages, en: en as ServiceMessages };

const ROWS = PRICING_PLANS.flatMap((plan) => ['ru', 'en'].map((locale) => [locale, plan.id] as const));

const faqOf = (locale: string, serviceId: string): FaqItem[] | undefined => MESSAGES[locale].services?.[serviceId]?.faq;

describe('FAQPage услуги из переводов', () => {
  it.each(ROWS)('%s, %s: собирается FAQPage со schema.org', (locale, serviceId) => {
    const result = serviceFaqJsonLd(MESSAGES[locale], serviceId);

    expect(result).not.toBeNull();
    expect(result?.['@context']).toBe('https://schema.org');
    expect(result?.['@type']).toBe('FAQPage');
  });

  it.each(ROWS)('%s, %s: вопросы и ответы — из переводов этой услуги, по порядку', (locale, serviceId) => {
    const faq = faqOf(locale, serviceId) ?? [];
    const result = serviceFaqJsonLd(MESSAGES[locale], serviceId);

    expect(faq.length).toBeGreaterThan(0);
    expect(result?.mainEntity).toEqual(
      faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    );
  });

  it.each(ROWS)('%s, %s: в переводах не меньше четырех непустых вопросов с ответами', (locale, serviceId) => {
    const faq = faqOf(locale, serviceId);

    expect(Array.isArray(faq)).toBe(true);
    expect(faq!.length).toBeGreaterThanOrEqual(4);

    for (const item of faq!) {
      expect(typeof item.question).toBe('string');
      expect(typeof item.answer).toBe('string');
      expect(item.question.trim()).not.toBe('');
      expect(item.answer.trim()).not.toBe('');
    }
  });

  it.each(PRICING_PLANS.map((plan) => [plan.id]))('%s: в ru и en одинаковое число вопросов', (serviceId) => {
    expect(faqOf('en', serviceId)?.length ?? 0).toBeGreaterThan(0);
    expect(faqOf('en', serviceId)?.length).toBe(faqOf('ru', serviceId)?.length);
  });

  it.each(['ru', 'en'])('%s: первые вопросы шести услуг попарно разные', (locale) => {
    const firstQuestions = PRICING_PLANS.map(
      (plan) => serviceFaqJsonLd(MESSAGES[locale], plan.id)?.mainEntity[0]?.name,
    );

    expect(firstQuestions.every((name) => typeof name === 'string' && name !== '')).toBe(true);
    expect(new Set(firstQuestions).size).toBe(PRICING_PLANS.length);
  });

  it('пустая пара пропускается, остальные остаются', () => {
    const messages: ServiceMessages = {
      services: {
        landing: {
          faq: [
            { question: 'Q1', answer: '  ' },
            { question: '', answer: 'A2' },
            { question: 'Q3', answer: 'A3' },
          ],
        },
      },
    };

    expect(serviceFaqJsonLd(messages, 'landing')?.mainEntity).toEqual([
      { '@type': 'Question', name: 'Q3', acceptedAnswer: { '@type': 'Answer', text: 'A3' } },
    ]);
  });

  it('без пар с текстом, с пустым faq или без услуги в переводах — null, а не FAQPage с пустым mainEntity', () => {
    const messages: ServiceMessages = {
      services: {
        allEmpty: { faq: [{ question: ' ', answer: '' }] },
        noFaq: { faq: [] },
      },
    };

    expect(serviceFaqJsonLd(messages, 'allEmpty')).toBeNull();
    expect(serviceFaqJsonLd(messages, 'noFaq')).toBeNull();
    expect(serviceFaqJsonLd(messages, 'bogus')).toBeNull();
  });
});
