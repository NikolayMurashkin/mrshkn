'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './BriefThanks.module.scss';

export const BriefThanksView = () => {
  const t = useTranslations('briefThanks');

  return (
    <main
      className={styles.thanks}
      data-testid="brief-thanks"
    >
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.text}>{t('text')}</p>
      <p className={styles.note}>{t('note')}</p>
      <Link
        className={styles.back}
        href="/"
      >
        {t('back')}
      </Link>
    </main>
  );
};
