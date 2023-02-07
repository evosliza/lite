import { FC, PropsWithChildren } from 'react';

import styles from './card.module.css';

export const CardFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles['footer']}>
      {children}
    </div>
  );
};
