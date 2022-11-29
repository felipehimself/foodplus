import React from 'react';
import Sidebar from './Sidebar';
import Summary from './Summary';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const inter = Inter();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <main className={inter.className}>
      <Sidebar />
      {router.pathname.includes('admin') ? (
        <div className='ml-[80px] flex'>{children}</div>
      ) : (
        <div className='ml-[80px] flex'>
          <Summary />
          <div className='w-full h-screen overflow-y-scroll py-2 pl-8'>{children}</div>
        </div>
      )}
    </main>
  );
};
export default Layout;
