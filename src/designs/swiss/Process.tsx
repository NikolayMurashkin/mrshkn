import { useTranslations } from 'next-intl';
import { PROCESS_STEPS, PROMISES } from '@/content/process';
import { SWISS_KEY_DAYS, SWISS_SCALE_DAYS } from './consts';
import { SwissSteps } from './Steps';
import styles from './Process.module.scss';

export const SwissProcess = () => {
  const t = useTranslations('process');
  const hero = useTranslations('hero');

  return (
    <section
      className={styles.process}
      data-testid="process"
      id="process"
      aria-labelledby="process-heading"
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
            id="process-heading"
          >
            {t('promisesHeading')}
          </h2>
          <p className={styles.note}>{t('contractNote')}</p>
        </div>
      </div>

      <div className={styles.body}>
        <ul
          className={styles.promises}
          data-testid="promises"
        >
          {PROMISES.map((promise) => (
            <li
              className={styles.cell}
              key={promise}
            >
              <span className={styles.kicker}>{t(`promises.${promise}.kicker`)}</span>
              <span className={styles.value}>{t(`promises.${promise}.value`)}</span>
              <span className={styles.detail}>{t(`promises.${promise}.detail`)}</span>
            </li>
          ))}
        </ul>

        <div className={styles.timeline}>
          <h3 className={styles.subhead}>{t('heading')}</h3>
          <div
            className={styles.scale}
            aria-hidden="true"
          >
            {SWISS_SCALE_DAYS.map((day) => (
              <span
                className={SWISS_KEY_DAYS.has(day) ? `${styles.day} ${styles.dayKey}` : styles.day}
                key={day}
              >
                {day}
              </span>
            ))}
          </div>
          <SwissSteps
            steps={PROCESS_STEPS.map((step) => ({
              id: step.id,
              day: step.day,
              label: hero('kinetic.dayUnit'),
              value: String(step.day),
              title: t(`steps.${step.id}.title`),
              text: t(`steps.${step.id}.text`),
            }))}
            testId="steps"
            titleTag="span"
          />
        </div>
      </div>
    </section>
  );
};
