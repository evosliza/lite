import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
      <main className="app">
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}

export default CustomApp;
