import { useTranslations } from 'next-intl';
import type { ServicePageProps } from '@/components/ServicePage/types';
import { useServicePage } from '@/components/ServicePage/use-service-page';
import { PopBasics } from './Basics';
import { PopChecks } from './Checks';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';
import { PopOptions } from './Options';
import { PopSteps } from './Steps';
import { splitStepWhen } from './utils';
import styles from './ServicePage.module.scss';

export const PopServicePage = ({ service }: ServicePageProps) => {
  const t = useTranslations('servicePage');
  const data = useServicePage(service);

  if (!data) {
    return null;
  }

  const {
    name,
    summary,
    term,
    price,
    cardAmount,
    priceKind,
    hasRevisions,
    cardPoints,
    ownBasics,
    options,
    steps,
    faq,
  } = data;
  const revisions = t('revisions');
  const points = hasRevisions ? [...cardPoints, revisions] : cardPoints;

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
        <ArrowLeftIcon />
        {t('back')}
      </a>

      <header className={styles.head}>
        <p className={styles.label}>{t('kicker')}</p>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.lead}>{summary}</p>
        <ul className={styles.tags}>
          <li className={styles.tag}>{term}</li>
          <li className={styles.tag}>{price}</li>
          {hasRevisions ? <li className={styles.tag}>{revisions}</li> : null}
        </ul>
        <div className={styles.meta}>
          <a
            className={styles.cta}
            href={data.briefHref}
          >
            {t('cta')}
            <ArrowRightIcon />
          </a>
          <span className={styles.kind}>{priceKind}</span>
        </div>
      </header>

      <div className={styles.cols}>
        <div className={styles.stack}>
          <section
            className={styles.block}
            aria-labelledby="service-basics"
          >
            <div className={styles.blockHead}>
              <h2
                className={styles.blockTitle}
                id="service-basics"
              >
                {t('basicsHeading')}
              </h2>
              <p className={styles.blockNote}>{ownBasics ? ownBasics.note : t('basicsNote')}</p>
            </div>
            {ownBasics ? (
              <div className={styles.ownBasics}>
                <PopChecks items={ownBasics.items} />
              </div>
            ) : (
              <PopBasics
                titleTag="h3"
                narrow
              />
            )}
          </section>

          {options.length > 0 ? (
            <section
              className={styles.block}
              aria-labelledby="service-options"
            >
              <div className={styles.blockHead}>
                <h2
                  className={styles.blockTitle}
                  id="service-options"
                >
                  {t('optionsHeading')}
                </h2>
                <p className={styles.blockNote}>{t('optionsNote')}</p>
              </div>
              <PopOptions
                items={options}
                testId="service-options"
                narrow
              />
              <a
                className={styles.more}
                href={data.pricesHref}
              >
                {t('allOptions')}
                <ArrowRightIcon />
              </a>
            </section>
          ) : null}

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
            <PopSteps
              steps={steps.map(({ when, title, text }) => ({ id: title, ...splitStepWhen(when), title, text }))}
              testId="service-process"
              titleTag="h3"
              narrow
            />
          </section>

          {faq.length > 0 ? (
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
                {faq.map((item) => (
                  <details
                    className={styles.question}
                    key={item.question}
                  >
                    <summary className={styles.summary}>{item.question}</summary>
                    <p className={styles.answer}>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className={styles.aside}>
          <div className={styles.card}>
            <span className={styles.cardKind}>{priceKind}</span>
            <span className={styles.amount}>{cardAmount}</span>
            <span className={styles.cardTerm}>{term}</span>
            {points.length > 0 ? (
              <PopChecks
                items={points}
                inheritColor
              />
            ) : null}
            <a
              className={styles.cardCta}
              href={data.briefHref}
              data-testid="service-cta"
            >
              {t('cta')}
              <ArrowRightIcon />
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
};
