import { FC, PropsWithChildren } from 'react';
import styles from './card.module.css';

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles['container']}>{children}</div>;
};
