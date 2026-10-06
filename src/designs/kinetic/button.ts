import type { ButtonClassOptions } from './types';
import styles from './Button.module.scss';

export const buttonClass = ({ primary = false, size, onInk = false }: ButtonClassOptions = {}) =>
  [styles.button, primary && styles.primary, size && styles[size], onInk && styles.onInk].filter(Boolean).join(' ');
