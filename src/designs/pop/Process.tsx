import { useTranslations } from 'next-intl';
import { PROCESS_STEPS, PROMISES } from '@/content/process';
import { POP_BOARD_DAYS, POP_KEY_DAY_TONES } from './consts';
import { PopSteps } from './Steps';
import styles from './Process.module.scss';

export const PopProcess = () => {
  const t = useTranslations('process');
  const hero = useTranslations('hero');
  const steps = PROCESS_STEPS.map((step) => ({
    id: step.id,
    day: step.day,
    label: hero('kinetic.dayUnit'),
    value: String(step.day),
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
        <p className={styles.note}>{t('contractNote')}</p>
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

      <h3 className={styles.subhead}>{t('heading')}</h3>

      <div
        className={styles.board}
        aria-hidden="true"
      >
        {POP_BOARD_DAYS.map((day) => {
          const tone = POP_KEY_DAY_TONES.get(day);

          return (
            <span
              className={tone ? `${styles.cell} ${styles.cellKey} ${styles[`tone${tone}`]}` : styles.cell}
              key={day}
            >
              {day}
            </span>
          );
        })}
      </div>

      <PopSteps
        steps={steps}
        testId="steps"
        titleTag="span"
      />
    </section>
  );
};
