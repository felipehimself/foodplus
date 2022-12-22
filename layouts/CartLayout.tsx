import React from 'react';
import { useSelector } from 'react-redux';
import Cart from '../components/Cart';
import { RootState } from '../store/store';
import Sidebar from '../components/Sidebar';
import MobileTab from '../components/MobileTab';
import MobileNavbar from '../components/MobileNavbar';
import MobileCart from '../components/MobileCart';

export const CartLayout = ({ children }: { children: React.ReactNode }) => {
  
  const { showCart } = useSelector((state: RootState) => state.showCart);

  return (
    <>
      <MobileNavbar />
      <div className='flex'>
        <Sidebar />
        <MobileTab />
        <MobileCart showCart={showCart} />
        <Cart />
        <div className='w-full h-screen overflow-y-auto py-2 px-6'>
          {children}
        </div>
      </div>
    </>
  );
};
