import { useEffect, useState } from 'react';
import { ACTIVE_SECTION_MARGIN, PAGE_END_TOLERANCE } from './consts';

export const useActiveSection = (ids: readonly string[], enabled: boolean) => {
  const [inView, setInView] = useState<string | null>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const inBand = new Set<string>();
    const reversed = [...ids].reverse();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inBand.add(entry.target.id);
          } else {
            inBand.delete(entry.target.id);
          }
        }

        setInView(reversed.find((id) => inBand.has(id)) ?? null);
      },
      { rootMargin: ACTIVE_SECTION_MARGIN },
    );

    for (const id of ids) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    const onScroll = () => {
      setAtEnd(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - PAGE_END_TOLERANCE);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids, enabled]);

  if (!enabled) {
    return null;
  }

  return atEnd ? (ids[ids.length - 1] ?? null) : inView;
};
