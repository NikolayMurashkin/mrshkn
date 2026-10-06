import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { DesignSection } from '@/designs/registry';
import { getDesign } from '@/designs/server';
import { THANKS_HREF } from '@/lib/brief/consts';

type ThanksPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: ThanksPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'briefThanks.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}${THANKS_HREF}` },
    robots: { index: false, follow: true },
  };
};

const ThanksPage = async ({ params }: ThanksPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const design = await getDesign();

  return (
    <DesignSection
      design={design}
      section="briefThanks"
    />
  );
};

export default ThanksPage;
