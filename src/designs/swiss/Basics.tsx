import { createElement } from 'react';
import { useTranslations } from 'next-intl';
import { PRICING_BASIC_GROUPS } from '@/content/pricing';
import { SwissChecks } from './Checks';
import type { SwissBasicsProps } from './types';
import styles from './Basics.module.scss';

export const SwissBasics = ({ titleTag, narrow = false }: SwissBasicsProps) => {
  const t = useTranslations('pricing');

  return (
    <div
      className={narrow ? `${styles.groups} ${styles.narrow}` : styles.groups}
      data-testid="basics"
    >
      {PRICING_BASIC_GROUPS.map((group) => (
        <div
          className={styles.group}
          data-testid="basics-group"
          key={group.id}
        >
          {createElement(titleTag, { className: styles.title }, t(`basicsGroups.${group.id}`))}
          <SwissChecks items={group.items.map((item) => t(`basics.${item}`))} />
        </div>
      ))}
    </div>
  );
};
