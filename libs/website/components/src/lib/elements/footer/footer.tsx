import { FC } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import styles from './footer.module.css';

export const Footer: FC = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className={styles['section']}>
      <div className={styles['container']}>
        {!user && <p className={styles['text']}>To Add Quizes</p>}

        {user ? (
          <a className={styles['link']} href="/api/auth/logout" rel="nofollow">
            Logout
          </a>
        ) : (
          <a className={styles['link']} href="/api/auth/login" rel="nofollow">
            Sign In
          </a>
        )}
      </div>
    </section>
  );
};
