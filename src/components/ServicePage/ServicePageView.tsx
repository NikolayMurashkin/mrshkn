'use client';

import { useTranslations } from 'next-intl';
import { PRICING_BASIC_GROUPS } from '@/content/pricing';
import type { ServicePageProps } from './types';
import { useServicePage } from './use-service-page';
import styles from './ServicePage.module.scss';

export const ServicePageView = ({ service }: ServicePageProps) => {
  const t = useTranslations('servicePage');
  const pricing = useTranslations('pricing');
  const data = useServicePage(service);

  if (!data) {
    return null;
  }

  const { name, summary, term, price, priceKind, hasRevisions, ownBasics, options, steps, faq } = data;

  return (
    <article
      className={styles.page}
      data-testid="service-page"
      data-service={data.service.id}
    >
      <a
        className={styles.back}
        href={data.backHref}
      >
        ← {t('back')}
      </a>

      <header className={styles.head}>
        <p className={styles.kicker}>{t('kicker')}</p>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.lead}>{summary}</p>
        <ul className={styles.tags}>
          <li className={styles.tag}>{term}</li>
          <li className={styles.tag}>{price}</li>
          {hasRevisions ? <li className={styles.tag}>{t('revisions')}</li> : null}
        </ul>
        <a
          className={styles.cta}
          href={data.briefHref}
          data-testid="service-cta"
        >
          {t('cta')}
        </a>
        <p className={styles.kind}>{priceKind}</p>
      </header>

      <section
        className={styles.block}
        aria-labelledby="service-basics"
      >
        <h2
          className={styles.blockTitle}
          id="service-basics"
        >
          {t('basicsHeading')}
        </h2>
        <p className={styles.note}>{ownBasics ? ownBasics.note : t('basicsNote')}</p>
        {ownBasics ? (
          <ul className={styles.checks}>
            {ownBasics.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className={styles.groups}>
            {PRICING_BASIC_GROUPS.map((group) => (
              <div
                className={styles.group}
                key={group.id}
              >
                <h3 className={styles.groupTitle}>{pricing(`basicsGroups.${group.id}`)}</h3>
                <ul className={styles.checks}>
                  {group.items.map((item) => (
                    <li key={item}>{pricing(`basics.${item}`)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section
        className={styles.block}
        aria-labelledby="service-options"
      >
        <h2
          className={styles.blockTitle}
          id="service-options"
        >
          {t('optionsHeading')}
        </h2>
        <p className={styles.note}>{t('optionsNote')}</p>
        <ul
          className={styles.options}
          data-testid="service-options"
        >
          {options.map((option) => (
            <li
              className={styles.option}
              key={option.id}
            >
              <span className={styles.optionName}>{option.name}</span>
              <span className={styles.optionPrice}>{option.amount}</span>
              <span className={styles.optionNote}>{option.note}</span>
              {option.monthly ? <span className={styles.optionMonthly}>{option.monthly}</span> : null}
            </li>
          ))}
        </ul>
        <a
          className={styles.more}
          href={data.pricesHref}
        >
          {t('allOptions')}
        </a>
      </section>

      <section
        className={styles.block}
        aria-labelledby="service-process"
      >
        <h2
          className={styles.blockTitle}
          id="service-process"
        >
          {t('processHeading')}
        </h2>
        <ol
          className={styles.steps}
          data-testid="service-process"
        >
          {steps.map((step, index) => (
            <li
              className={styles.step}
              key={index}
            >
              <span className={styles.when}>{step.when}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={styles.block}
        aria-labelledby="service-faq"
      >
        <h2
          className={styles.blockTitle}
          id="service-faq"
        >
          {t('faqHeading')}
        </h2>
        <div
          className={styles.faq}
          data-testid="service-faq"
        >
          {faq.map((item, index) => (
            <details
              className={styles.question}
              key={index}
            >
              <summary className={styles.summary}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
};
