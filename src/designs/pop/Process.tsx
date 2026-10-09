import { useTranslations } from 'next-intl';
import { PROCESS_STEPS, PROMISES } from '@/content/process';
import { POP_BOARD_DAYS, POP_KEY_DAY_TONES, POP_STEP_TONES } from './consts';
import styles from './Process.module.scss';

export const PopProcess = () => {
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

      <ol
        className={styles.steps}
        data-testid="steps"
      >
        {PROCESS_STEPS.map((step, index) => (
          <li
            className={styles.step}
            data-day={step.day}
            key={step.id}
          >
            <span className={`${styles.day} ${styles[`tone${POP_STEP_TONES[index % POP_STEP_TONES.length]}`]}`}>
              <span className={styles.dayLabel}>{hero('kinetic.dayUnit')}</span>
              <span className={styles.dayNum}>{step.day}</span>
            </span>
            <span className={styles.stepTitle}>{t(`steps.${step.id}.title`)}</span>
            <span className={styles.stepText}>{t(`steps.${step.id}.text`)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};
