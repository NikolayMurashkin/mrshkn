import type { TerminalChecksProps } from './types';
import styles from './Checks.module.scss';

export const TerminalChecks = ({ items }: TerminalChecksProps) => (
  <ul className={styles.checks}>
    {items.map((item) => (
      <li
        className={styles.check}
        key={item}
      >
        {item}
      </li>
    ))}
  </ul>
);
