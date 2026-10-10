import type { EditorialChoicesProps } from './types';
import styles from './EditorialBrief.module.scss';

export const EditorialChoices = ({ field, values, selected, labelOf, onPick }: EditorialChoicesProps) => (
  <div className={styles.choices}>
    {values.map((value) => (
      <button
        key={value}
        type="button"
        className={styles.choice}
        data-testid="brief-option"
        data-value={value}
        aria-pressed={selected === value}
        onClick={() => onPick(field, value)}
      >
        {labelOf(value)}
      </button>
    ))}
  </div>
);
