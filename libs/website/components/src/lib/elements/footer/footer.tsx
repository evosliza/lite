import { FC } from 'react';

import styles from './footer.module.css';

export const Footer: FC = () => {
  return (
    <section className={styles['section']}>
      <div className={styles['container']}>
        <p className={styles['text']}>To Add Quizes</p>

        <a className={styles['link']} href="/auth" rel="nofollow">
          Sign In
        </a>
      </div>
    </section>
  );
};
