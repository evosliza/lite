import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';

import styles from './button.module.css';

/* eslint-disable-next-line */
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'naked';
  size?: 'primary' | 'small';
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'primary',
  ...otherProps
}) => {
  return (
    <button
      className={clsx(
        styles['button'],
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        className
      )}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
};
