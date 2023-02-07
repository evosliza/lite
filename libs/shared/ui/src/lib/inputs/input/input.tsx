import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';

import styles from './input.module.css';

/* eslint-disable-next-line */
export interface InputProps extends ComponentPropsWithoutRef<'input'> {}

export const Input: FC<InputProps> = ({ className, ...otherProps }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
      <div className="mx-3">
        <input
          type="text"
          className={clsx(styles['input'], className)}
          {...otherProps}
        />
      </div>
    </div>
  );
};
