import type { SectionHeadProps } from './types';
import styles from './SectionHead.module.scss';

export const SectionHead = ({ id, kicker, title, note }: SectionHeadProps) => (
  <div className={styles.head}>
    <div className={styles.title}>
      <p className={styles.kicker}>{kicker}</p>
      <h2
        className={styles.heading}
        id={id}
      >
        {title}
      </h2>
    </div>
    {note ? <p className={styles.note}>{note}</p> : null}
  </div>
);
