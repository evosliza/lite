import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';

import styles from './button.module.css';

/* eslint-disable-next-line */
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

export const Button: FC<ButtonProps> = ({ children, className, ...otherProps }) => {
  return (
    <button
      className={clsx(styles['button'], className)}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
};
