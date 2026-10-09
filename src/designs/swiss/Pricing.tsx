import { useTranslations } from 'next-intl';
import { planPath } from '@/content/format';
import { PRICING_BASIC_GROUPS, PRICING_EXTRAS, PRICING_OPTIONS, PRICING_PLANS } from '@/content/pricing';
import { usePriceText } from '@/content/use-price';
import { Link } from '@/i18n/navigation';
import { SWISS_COUNT_DIGITS } from './consts';
import { ArrowRightIcon } from './icons';
import styles from './Pricing.module.scss';

export const SwissPricing = () => {
  const t = useTranslations('pricing');
  const price = usePriceText();

  return (
    <section
      className={styles.pricing}
      id="services"
      data-testid="pricing"
      aria-labelledby="pricing-heading"
    >
      <div className={styles.head}>
        <div className={styles.aside}>
          <span
            className={styles.index}
            aria-hidden="true"
          />
          <span className={styles.mark}>{t('sectionMark')}</span>
        </div>
        <div className={styles.titleColumn}>
          <h2
            className={styles.heading}
            id="pricing-heading"
          >
            {t('heading')}
          </h2>
          <p className={styles.note}>{t('note')}</p>
        </div>
      </div>

      <div className={styles.body}>
        <div id="prices">
          <div
            className={styles.columns}
            aria-hidden="true"
          >
            <span>{t('columns.number')}</span>
            <span>{t('columns.product')}</span>
            <span>{t('columns.inside')}</span>
            <span>{t('columns.term')}</span>
            <span className={styles.columnPrice}>{t('columns.price')}</span>
          </div>

          <ul className={styles.plans}>
            {PRICING_PLANS.map((plan, index) => (
              <li
                className={styles.plan}
                data-testid={`plan-${plan.id}`}
                key={plan.id}
              >
                <Link
                  className={styles.planLink}
                  href={planPath(plan)}
                  aria-label={t('planLink', { name: t(`plans.${plan.id}.name`) })}
                >
                  <span className={styles.number}>{String(index + 1).padStart(SWISS_COUNT_DIGITS, '0')}</span>
                  <span className={styles.name}>{t(`plans.${plan.id}.name`)}</span>
                  <span className={styles.summary}>{t(`plans.${plan.id}.summary`)}</span>
                  <span className={styles.term}>{t(`plans.${plan.id}.term`)}</span>
                  <span className={styles.price}>{price.plan(plan)}</span>
                  <span
                    className={styles.arrow}
                    aria-hidden="true"
                  >
                    <ArrowRightIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={styles.miniApp}
          data-testid="mini-app-note"
        >
          <p className={styles.miniAppTitle}>{t('miniAppNote.title')}</p>
          <p className={styles.miniAppText}>{t('miniAppNote.text')}</p>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t('basicsHeading')}</h3>
            <p className={styles.blockNote}>{t('basicsNote')}</p>
          </div>
          <div
            className={styles.groups}
            data-testid="basics"
          >
            {PRICING_BASIC_GROUPS.map((group) => (
              <div
                className={styles.group}
                data-testid="basics-group"
                key={group.id}
              >
                <h4 className={styles.groupTitle}>{t(`basicsGroups.${group.id}`)}</h4>
                <ul className={styles.checks}>
                  {group.items.map((item) => (
                    <li key={item}>{t(`basics.${item}`)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t('optionsHeading')}</h3>
            <p className={styles.blockNote}>{t('optionsNote')}</p>
          </div>
          <ul
            className={styles.options}
            data-testid="options"
          >
            {PRICING_OPTIONS.map((option) => {
              const { amount, monthly } = price.option(option);

              return (
                <li
                  className={styles.option}
                  key={option.id}
                >
                  <span className={styles.optionName}>{t(`options.${option.id}.name`)}</span>
                  <span
                    className={styles.optionPrice}
                    data-testid="option-price"
                  >
                    {amount}
                  </span>
                  <span className={styles.optionNote}>{t(`options.${option.id}.note`)}</span>
                  {monthly ? <span className={styles.optionMonthly}>{monthly}</span> : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t('extrasHeading')}</h3>
            <p className={styles.blockNote}>{t('extrasNote')}</p>
          </div>
          <ul
            className={styles.extras}
            data-testid="extras"
          >
            {PRICING_EXTRAS.map((extra) => (
              <li
                className={styles.extra}
                key={extra.id}
              >
                <h4 className={styles.extraName}>{t(`extras.${extra.id}.name`)}</h4>
                <span className={styles.extraPrice}>{price.extra(extra)}</span>
                <p className={styles.extraSummary}>{t(`extras.${extra.id}.summary`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
