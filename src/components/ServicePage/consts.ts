/** У поддержки нет раундов правок: вместо них часы по тарифу. */
export const SERVICES_WITHOUT_REVISIONS: readonly string[] = ['support'];

/** Услуги с абонплатой: цена за месяц, у «Что входит» свой список вместо базы из 13 пунктов. */
export const MONTHLY_SERVICES: readonly string[] = ['support'];

/** Что повторяется в карточке тарифа из базы: у поддержки срока, Lighthouse и гарантии на запуск нет. */
export const SERVICE_CARD_POINTS: Record<string, readonly string[]> = {
  default: ['deadline', 'lighthouse', 'warranty'],
  support: [],
};

export const CARD_POINT_KEYS: Record<string, string> = {
  deadline: 'servicePage.cardPoints.deadline',
  lighthouse: 'pricing.basics.lighthouse',
  warranty: 'servicePage.cardPoints.warranty',
};
