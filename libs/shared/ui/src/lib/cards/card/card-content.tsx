import { FC, PropsWithChildren } from 'react';

import styles from './card.module.css';

export const CardContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles['content']}>{children}</div>;
};
