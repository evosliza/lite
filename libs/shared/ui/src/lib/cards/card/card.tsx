import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './card.module.css';

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className }, ref) => (
    <div className={clsx(styles['container'], className)} ref={ref}>
      {children}
    </div>
  )
);
