import { createElement } from 'react';
import { SWISS_STEP_TEXT_TAGS } from './consts';
import type { SwissStepsProps } from './types';
import styles from './Steps.module.scss';

export const SwissSteps = ({ steps, testId, titleTag, narrow = false }: SwissStepsProps) => (
  <ol
    className={narrow ? `${styles.steps} ${styles.narrow}` : styles.steps}
    data-testid={testId}
  >
    {steps.map((step) => (
      <li
        className={styles.step}
        data-day={step.day}
        key={step.id}
      >
        <span className={styles.when}>
          {step.value === null ? (
            <span className={styles.words}>{step.label}</span>
          ) : (
            <>
              {step.label ? <span className={styles.kicker}>{step.label}</span> : null}
              <span className={styles.numeral}>{step.value}</span>
            </>
          )}
        </span>
        {createElement(titleTag, { className: styles.title }, step.title)}
        {createElement(SWISS_STEP_TEXT_TAGS[titleTag], { className: styles.text }, step.text)}
      </li>
    ))}
  </ol>
);
