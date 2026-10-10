import { Fragment } from 'react';
import { EDITORIAL_NOWRAP_PATTERN } from './consts';
import type { EditorialDashesProps } from './types';
import styles from './Dashes.module.scss';

const renderItem = (item: string) =>
  item.split(EDITORIAL_NOWRAP_PATTERN).map((part, index) =>
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

export const EditorialDashes = ({ items }: EditorialDashesProps) => (
  <ul className={styles.dashes}>
    {items.map((item) => (
      <li key={item}>{renderItem(item)}</li>
    ))}
  </ul>
);
