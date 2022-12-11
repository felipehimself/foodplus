import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store/store';

import { Inter } from '@next/font/google';
import Sidebar from '../components/Sidebar';

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

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <main className={inter.className}>
          <Sidebar />
          <div className='ml-[80px] flex'>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </main>
      </Provider>
    </SessionProvider>
  );
}
