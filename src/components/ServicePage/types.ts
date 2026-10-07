import type { FaqItem, Service } from '@/content/types';

export type ServicePageProps = {
  /** Ключ тарифа из `PRICING_PLANS`: по нему выбираются услуга, тексты и цена. */
  service: string;
};

export type ServiceStep = {
  when: string;
  title: string;
  text: string;
};

export type ServiceBasics = {
  note: string;
  items: string[];
};

export type ServiceOptionView = {
  id: string;
  name: string;
  note: string;
  amount: string;
  monthly?: string;
};

export type ServicePageData = {
  service: Service;
  name: string;
  summary: string;
  term: string;
  price: string;
  cardAmount: string;
  priceKind: string;
  hasRevisions: boolean;
  cardPoints: string[];
  ownBasics: ServiceBasics | null;
  steps: ServiceStep[];
  faq: FaqItem[];
  options: ServiceOptionView[];
  backHref: string;
  briefHref: string;
  pricesHref: string;
};
