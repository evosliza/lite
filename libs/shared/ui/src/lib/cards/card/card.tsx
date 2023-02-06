import { FC } from 'react';
import { Button } from '@lite/shared-ui';

import styles from './card.module.css';

export interface CardProps {
  title: string;
  description: string;
  href: string;
}

export const Card: FC<CardProps> = ({ title, description, href }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h2>{title}</h2>
      </div>
      <div className={styles['content']}>
        <p>{description}</p>
      </div>

      <div className={styles['footer']}>
        <Button>
          <a href={href}>Get It</a>
        </Button>
      </div>
    </div>
  );
};
