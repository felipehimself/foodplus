import React from 'react';
import Sidebar from './Sidebar';
import Cart from './Cart';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';

const inter = Inter();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  const isSummaryNeeded =
    !router.pathname.includes('/admin') && !(router.pathname === '/');

  return (
    <main className={inter.className}>
      <Sidebar setShowCart={setShowCart} />
      <div className='ml-[80px] flex'>
        {isSummaryNeeded ? (
          <>
            <Cart showCart={showCart} />
            <div
              onClick={() => setShowCart(false)}
              className='w-full h-screen overflow-y-scroll py-2 pl-8'
            >
              {children}
            </div>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </main>
  );
};
export default Layout;
