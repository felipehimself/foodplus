import React from 'react';
import { useSelector } from 'react-redux';
import Cart from '../components/Cart';
import { RootState } from '../store/store';
import { useAppDispatch } from '../store/store';
import { toggleShowCart } from '../features/showCartSlice';
import Sidebar from '../components/Sidebar';

export const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { showCart } = useSelector((state: RootState) => state.showCart);

  const handleShowCart = () => {
    dispatch(toggleShowCart(false));
  };

  return (
    <div style={{marginLeft:'5rem'}} className='ml-[4.75rem] md:ml-[5rem] flex'>
      <Sidebar />
      <Cart showCart={showCart} />
      <div
        onClick={handleShowCart}
        className='w-full h-screen overflow-y-auto py-2 px-6'
      >
        {children}
      </div>
    </div>
  );
};
