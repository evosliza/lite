import { forwardRef, PropsWithChildren } from 'react';
import styles from './card.module.css';

export const Card = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => (
    <div className={styles['container']} ref={ref}>
      {children}
    </div>
  )
);
