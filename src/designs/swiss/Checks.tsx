import { Fragment } from 'react';
import { SWISS_NOWRAP_PATTERN } from './consts';
import type { SwissChecksProps } from './types';
import styles from './Checks.module.scss';

const renderItem = (item: string) =>
  item.split(SWISS_NOWRAP_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <span
        className={styles.nowrap}
        key={`${index}-${part}`}
      >
        {part}
      </span>
    ) : (
      <Fragment key={`${index}-${part}`}>{part}</Fragment>
    ),
  );

export const SwissChecks = ({ items }: SwissChecksProps) => (
  <ul className={styles.checks}>
    {items.map((item) => (
      <li
        className={styles.check}
        key={item}
      >
        {renderItem(item)}
      </li>
    ))}
  </ul>
);
