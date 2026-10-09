import type { SwissIconProps } from './types';

export const ArrowRightIcon = ({ size = 20, className }: SwissIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeftIcon = ({ size = 14, className }: SwissIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowUpRightIcon = ({ size = 18, className }: SwissIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const SunIcon = ({ size = 20, className }: SwissIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="4.2"
    />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);
