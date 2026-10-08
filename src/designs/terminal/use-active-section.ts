import { useEffect, useState } from 'react';
import { ACTIVE_SECTION_TOLERANCE, ANCHOR_OFFSET, PAGE_END_TOLERANCE } from './consts';

export const useActiveSection = (ids: readonly string[], enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - PAGE_END_TOLERANCE;
      let next: string | null = null;

      if (atEnd) {
        next = ids[ids.length - 1] ?? null;
      } else {
        const line = ANCHOR_OFFSET + ACTIVE_SECTION_TOLERANCE;
        let nearest = -Infinity;

        for (const id of ids) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;

          if (top !== undefined && top <= line && top > nearest) {
            nearest = top;
            next = id;
          }
        }
      }

      setActive(next);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', onScroll);
    };
  }, [ids, enabled]);

  return enabled ? active : null;
};
