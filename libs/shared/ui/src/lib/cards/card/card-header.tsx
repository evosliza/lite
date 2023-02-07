import { FC, PropsWithChildren } from 'react';

import styles from './card.module.css';

export const CardHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles['header']}>
      <h2>{children}</h2>
    </div>
  );
};
