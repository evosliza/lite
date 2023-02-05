import { ComponentPropsWithoutRef, FC } from 'react';

import styles from './input.module.css';

/* eslint-disable-next-line */
export interface InputProps extends ComponentPropsWithoutRef<'input'> {
}

export const Input: FC<InputProps> = ({ ...otherProps }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
      <div className="mx-3">
        <input
          type="text"
          className={styles['input']}
          {...otherProps}
        />
      </div>
    </div>
  );
};
