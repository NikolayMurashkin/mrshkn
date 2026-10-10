import type { EditorialRubricProps } from './types';
import styles from './Rubric.module.scss';

export const EditorialRubric = ({ label, note }: EditorialRubricProps) => (
  <div className={styles.rubric}>
    <span className={styles.label}>{label}</span>
    <span
      className={styles.rule}
      aria-hidden="true"
    />
    {note ? <span className={styles.note}>{note}</span> : null}
  </div>
);
