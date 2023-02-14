import clsx from 'clsx';
import { FC } from 'react';

import styles from './card.module.css';

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: FC<CardFooterProps> = ({ className, children }) => {
  return (
    <div className={clsx(styles['footer'], className)}>
      {children}
    </div>
  );
};
