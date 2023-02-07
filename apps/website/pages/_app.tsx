import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Welcome to website!</title>
      </Head>

      <UserProvider>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
