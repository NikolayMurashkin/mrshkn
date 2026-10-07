import { describe, expect, it } from 'vitest';
import { planHref } from '@/content/format';
import { PRICING_OPTIONS, PRICING_PLANS } from '@/content/pricing';
import { getServiceBySlug, SERVICES, serviceBriefHref } from '@/content/services';
import { routing } from '@/i18n/routing';
import { BRIEF_STEP_VALUES } from '@/lib/brief/consts';

const PLAN_ROWS = routing.locales.flatMap((locale) => PRICING_PLANS.map((plan) => [locale, plan.id, plan] as const));

describe('страницы услуг покрывают все тарифы', () => {
  it.each(PLAN_ROWS)('%s, %s: адрес тарифа из прайса есть среди страниц услуг', (locale, _id, plan) => {
    const pages = new Set(routing.locales.flatMap((l) => SERVICES.map((service) => `/${l}/${service.slug}`)));

    expect(pages.has(planHref(locale, plan).split('?')[0])).toBe(true);
  });

  it('справочник услуг: id как у тарифов, slug как у своего тарифа, слаги уникальны', () => {
    expect(SERVICES.map((service) => service.id).sort()).toEqual(PRICING_PLANS.map((plan) => plan.id).sort());

    for (const service of SERVICES) {
      expect(service.slug).toBe(PRICING_PLANS.find((plan) => plan.id === service.id)?.slug);
    }

    expect(new Set(SERVICES.map((service) => service.slug)).size).toBe(SERVICES.length);
  });

  it.each(PRICING_PLANS.map((plan) => [plan.slug, plan.id]))('getServiceBySlug(%s) отдает услугу %s', (slug, id) => {
    const service = getServiceBySlug(slug);

    expect(service?.slug).toBe(slug);
    expect(service?.id).toBe(id);
  });

  it.each(['bogus', '', 'brief', 'work', 'Landing'])(
    'getServiceBySlug(%j) — undefined, страница отдаст 404',
    (slug) => {
      expect(getServiceBySlug(slug)).toBeUndefined();
    },
  );

  it.each(PRICING_PLANS.map((plan) => [plan.id]))('%s: опции услуги — непустой список без дублей из прайса', (id) => {
    const service = SERVICES.find((item) => item.id === id);
    const optionIds = PRICING_OPTIONS.map((option) => option.id);

    expect(service).toBeDefined();
    expect(service!.options.length).toBeGreaterThan(0);
    expect(new Set(service!.options).size).toBe(service!.options.length);

    for (const option of service!.options) {
      expect(optionIds).toContain(option);
    }
  });

  const BRIEF_ROWS = routing.locales.flatMap((locale) => PRICING_PLANS.map((plan) => [locale, plan.id] as const));

  it.each(BRIEF_ROWS)('%s, %s: CTA ведет в квиз с предвыбором этой услуги', (locale, id) => {
    const service = SERVICES.find((item) => item.id === id);

    expect(service).toBeDefined();
    expect(serviceBriefHref(locale, service!)).toBe(`/${locale}/brief?plan=${id}`);
    expect(BRIEF_STEP_VALUES.product).toContain(id);
  });
});
