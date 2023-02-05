import { FC } from 'react';
import styles from './card.module.css';

/* eslint-disable-next-line */
export interface CardProps {
  title: string;
  description: string;
  href: string;
}

export const Card: FC<CardProps> = ({ title, description, href }) => {
  return (
    <div className={styles['card-container']}>
      <div className={styles['card-header']}>
        <h2>{title}</h2>
      </div>
      <div className={styles['card-content']}>
        <p>{description}</p>
      </div>

      <div className={styles['card-footer']}>
        <a href={href}>Get It</a>
      </div>
    </div>
  );
};
