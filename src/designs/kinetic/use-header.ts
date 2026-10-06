import { useEffect, useRef, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { KINETIC_SCROLL_BAND } from './consts';

/** Линия под шапкой появляется, когда сторож наверху страницы ушел из окна: IntersectionObserver, без scroll-слушателя. */
export const useScrolled = () => {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const node = sentinel.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { sentinel, scrolled };
};

const lastInPage = (nodes: HTMLElement[]) =>
  nodes.reduce<HTMLElement | null>(
    (last, node) => (!last || last.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING ? node : last),
    null,
  );

/**
 * Активный пункт меню — секция главной в узкой полосе окна. Наблюдатели живут, пока открыта главная;
 * на других страницах активного пункта нет. Из вложенных секций (`#services` содержит `#prices`) побеждает
 * та, что начинается позже.
 */
export const useActiveSection = (ids: readonly string[]) => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const isHome = pathname === '/';
  const key = ids.join(',');

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const nodes = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const inBand = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inBand.add(entry.target as HTMLElement);
          } else {
            inBand.delete(entry.target as HTMLElement);
          }
        }

        setActive(lastInPage([...inBand])?.id ?? null);
      },
      { rootMargin: KINETIC_SCROLL_BAND },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [isHome, key]);

  return isHome ? active : null;
};
