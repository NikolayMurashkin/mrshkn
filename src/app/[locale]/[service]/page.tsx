import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getServiceBySlug, SERVICES, serviceFaqJsonLd } from '@/content/services';
import type { ServiceMessages } from '@/content/types';
import { DesignSection } from '@/designs/registry';
import { getDesign } from '@/designs/server';
import { LOCALES } from '@/i18n/consts';
import { routing } from '@/i18n/routing';

export const dynamicParams = false;

type ServicePageRouteProps = {
  params: Promise<{ locale: string; service: string }>;
};

export const generateStaticParams = () =>
  routing.locales.flatMap((locale) => SERVICES.map((service) => ({ locale, service: service.slug })));

export const generateMetadata = async ({ params }: ServicePageRouteProps): Promise<Metadata> => {
  const { locale, service: slug } = await params;
  const service = getServiceBySlug(slug);

  if (!hasLocale(routing.locales, locale) || !service) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'pricing.plans' });

  return {
    title: t(`${service.id}.name`),
    description: t(`${service.id}.summary`),
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: Object.fromEntries(LOCALES.map((item) => [item, `/${item}/${slug}`])),
    },
  };
};

const ServiceRoute = async ({ params }: ServicePageRouteProps) => {
  const { locale, service: slug } = await params;
  const service = getServiceBySlug(slug);

  if (!hasLocale(routing.locales, locale) || !service) {
    notFound();
  }

  setRequestLocale(locale);

  const design = await getDesign();
  const messages = (await getMessages({ locale })) as ServiceMessages;
  const faq = serviceFaqJsonLd(messages, service.id);

  return (
    <main>
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, '\\u003c') }}
        />
      ) : null}
      <DesignSection
        design={design}
        section="servicePage"
        service={service.id}
      />
    </main>
  );
};

export default ServiceRoute;
