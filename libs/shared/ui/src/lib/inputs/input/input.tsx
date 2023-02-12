import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';

import styles from './input.module.css';

/* eslint-disable-next-line */
export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  onChange?: (value: string | number) => void;
}

export const Input: FC<InputProps> = ({
  className,
  type = 'text',
  onChange,
  ...otherProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(type === 'number' ? Number(e.target.value) : e.target.value);
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
      <div className="mx-3">
        <input
          className={clsx(styles['input'], className)}
          onChange={handleChange}
          {...otherProps}
        />
      </div>
    </div>
  );
};
