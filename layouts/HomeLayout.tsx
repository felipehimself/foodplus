import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MobileCart from '../components/MobileCart';
import MobileNavbar from '../components/MobileNavbar';
import MobileTab from '../components/MobileTab';
import Sidebar from '../components/Sidebar';
import { cleanCart, removeFromCart } from '../features/cartSlice';
import { toggleShowCart } from '../features/showCartSlice';
import { RootState, useAppDispatch } from '../store/store';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { showCart } = useSelector((state: RootState) => state.showCart);

  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
    toast.success('Item removed!');
  };

  const handleCancel = () => {
    dispatch(cleanCart());
    handleCloseCart();
    toast.success('Your cart was cleaned!');
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };
  const handleCloseCart = () => dispatch(toggleShowCart(false));

  return (
    <>
      <MobileNavbar />
      <Sidebar />
        <MobileCart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCancel={handleCancel}
          handleCheckout={handleCheckout}
          handleCloseCart={handleCloseCart}
          showCart={showCart}
        />
      <MobileTab />
      {children}
    </>
  );
};
export default HomeLayout;
