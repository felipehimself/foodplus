import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import useIsPageLoading from '../hooks/useIsLoading';
import PageLoading from '../components/PageLoading';
import { Inter } from '@next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: ComponentWithPageLayout) {
  const Layout = Component.PageLayout ? Component.PageLayout : React.Fragment;
  const isLoading = useIsPageLoading();

  return (
    <SessionProvider session={session}>
      <Toaster position='top-center' reverseOrder={false} />

      <Provider store={store}>
        {isLoading && <PageLoading />}
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Provider>
    </SessionProvider>
  );
}
