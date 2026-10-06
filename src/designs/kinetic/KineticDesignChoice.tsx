import { DESIGN_DEFAULT_THEME, DESIGN_LABELS } from '../consts';
import { BRIEF_DESIGN_THUMBS, THUMB_LINES } from '@/components/Brief/consts';
import { BRIEF_ANY_DESIGN } from '@/lib/brief/consts';
import { CheckIcon } from './icons';
import type { KineticDesignChoiceProps } from './types';
import styles from './KineticBrief.module.scss';

export const KineticDesignChoice = ({ selected, onPick, labelOf }: KineticDesignChoiceProps) => (
  <div className={styles.thumbs}>
    {BRIEF_DESIGN_THUMBS.map((design) => (
      <button
        key={design}
        type="button"
        className={styles.thumb}
        data-testid="brief-option"
        data-value={design}
        aria-pressed={selected === design}
        onClick={() => onPick('design', design)}
      >
        <span className={styles.art}>
          <span
            className={styles.canvas}
            data-design={design}
            data-theme={DESIGN_DEFAULT_THEME[design]}
            aria-hidden="true"
          >
            <span className={styles.sketchKicker} />
            {THUMB_LINES.map((width, index) => (
              <span
                key={width}
                className={index === 0 ? styles.sketchTitle : styles.sketchLine}
                style={{ width: `${width}%` }}
              />
            ))}
            <span className={styles.sketchButton} />
          </span>
        </span>
        <span className={styles.thumbName}>{DESIGN_LABELS[design]}</span>
      </button>
    ))}
    <button
      type="button"
      className={`${styles.choice} ${styles.anyDesign}`}
      data-testid="brief-option"
      data-value={BRIEF_ANY_DESIGN}
      aria-pressed={selected === BRIEF_ANY_DESIGN}
      onClick={() => onPick('design', BRIEF_ANY_DESIGN)}
    >
      {selected === BRIEF_ANY_DESIGN ? <CheckIcon /> : null}
      {labelOf(BRIEF_ANY_DESIGN)}
    </button>
  </div>
);
