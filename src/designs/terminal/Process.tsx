import { useTranslations } from 'next-intl';
import { PROCESS_STEPS, PROMISES } from '@/content/process';
import { PROCESS_KEY_DAYS, PROCESS_SCALE_DAYS } from './consts';
import { TerminalSteps } from './Steps';
import styles from './Process.module.scss';

export const TerminalProcess = () => {
  const t = useTranslations('process');
  const steps = PROCESS_STEPS.map((step, index) => ({
    id: step.id,
    day: step.day,
    label: t('stepLabel', { index: String(index + 1).padStart(2, '0'), day: step.day }),
    title: t(`steps.${step.id}.title`),
    text: t(`steps.${step.id}.text`),
  }));

  return (
    <section
      className={styles.process}
      data-testid="process"
      id="process"
      aria-labelledby="process-heading"
    >
      <div className={styles.head}>
        <h2
          className={styles.heading}
          id="process-heading"
        >
          {t('promisesHeading')}
        </h2>
        <p className={styles.note}>
          <span
            className={styles.prompt}
            aria-hidden="true"
          >
            {'//'}
          </span>{' '}
          {t('contractNote')}
        </p>
      </div>

      <ul
        className={styles.promises}
        data-testid="promises"
      >
        {PROMISES.map((promise) => (
          <li
            className={styles.promise}
            key={promise}
          >
            <span className={styles.kicker}>{t(`promises.${promise}.kicker`)}</span>
            <span className={styles.value}>{t(`promises.${promise}.value`)}</span>
            <span className={styles.detail}>{t(`promises.${promise}.detail`)}</span>
          </li>
        ))}
      </ul>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>{t('heading')}</h3>
        <ol
          className={styles.scale}
          aria-hidden="true"
        >
          {PROCESS_SCALE_DAYS.map((day) => (
            <li
              className={PROCESS_KEY_DAYS.has(day) ? `${styles.cell} ${styles.cellKey}` : styles.cell}
              key={day}
            >
              {String(day).padStart(2, '0')}
            </li>
          ))}
        </ol>

        <TerminalSteps
          steps={steps}
          testId="steps"
          titleTag="span"
        />
      </div>
    </section>
  );
};
