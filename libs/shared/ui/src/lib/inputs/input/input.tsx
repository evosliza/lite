import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';

import styles from './input.module.css';

/* eslint-disable-next-line */
export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
  onChange?: (value: string | number | null) => void;
  value?: string | number | null;
}

export const Input: FC<InputProps> = ({
  className,
  type = 'text',
  onChange,
  value,
  ...otherProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = e.target.value.trim();
      onChange(type === 'number' && value ? Number(value) : value);
    }
  };

  return (
    <div className={styles['input-container']}>
      <div className="mx-3">
        <input
          type={type}
          value={value ?? ''}
          className={clsx(styles['input'], className)}
          onChange={handleChange}
          {...otherProps}
        />
      </div>
    </div>
  );
};
