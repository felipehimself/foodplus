import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import useIsPageLoading from '../hooks/useIsLoading';
import PageLoading from '../components/PageLoading';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';

const inter = Inter();

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

  const { pathname } = useRouter();

  const getPageTitle = () : string => {
    const title = pathname.split('/')[1];
    const [first, ...rest] = title.split('');

    return first.toUpperCase() + rest.join('');
  };

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {isLoading && <PageLoading />}
        <main className={inter.className}>
          <Head>
            <title>{getPageTitle()}</title>
            <meta
              name='viewport'
              content='initial-scale=1.0, width=device-width'
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Provider>
    </SessionProvider>
  );
}
