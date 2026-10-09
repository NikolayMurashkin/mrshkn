import { createElement } from 'react';
import type { TerminalStepsProps } from './types';
import styles from './Steps.module.scss';

export const TerminalSteps = ({ steps, testId, titleTag, narrow = false }: TerminalStepsProps) => (
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
        <span className={styles.label}>{step.label}</span>
        {createElement(titleTag, { className: styles.title }, step.title)}
        <span className={styles.text}>{step.text}</span>
      </li>
    ))}
  </ol>
);
