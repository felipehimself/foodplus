import React from 'react';
import Sidebar from './Sidebar';
import Summary from './Summary';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';

const inter = Inter();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [showSummary, setShowSummary] = useState(false);

  const isSummaryNeeded = ![router.pathname].includes('/admin') && !(router.pathname === '/');
  

  return (
    <main className={inter.className}>
      <Sidebar setShowSummary={setShowSummary}/>
      <div className='ml-[80px] flex'>
        {isSummaryNeeded ? (
          <>
            <Summary showSummary={showSummary} />
            <div onClick={()=>setShowSummary(false)} className='w-full h-screen overflow-y-scroll py-2 pl-8'>
              {/* <button className='ml-96' onClick={()=>setShowSummary(prev=> !prev)}>open</button> */}
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
