import { FC } from 'react';
import clsx from 'clsx';

import styles from './card.module.css';

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div className={clsx(styles['header'], className)}>
      <h2>{children}</h2>
    </div>
  );
};
