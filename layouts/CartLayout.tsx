import React from 'react';
import { useSelector } from 'react-redux';
import Cart from '../components/Cart';
import { RootState, useAppDispatch } from '../store/store';
import Sidebar from '../components/Sidebar';
import MobileTab from '../components/MobileTab';
import MobileNavbar from '../components/MobileNavbar';
import MobileCart from '../components/MobileCart';
import { useRouter } from 'next/router';
import { cleanCart, removeFromCart } from '../features/cartSlice';
import { toast } from 'react-hot-toast';
import { toggleShowCart } from '../features/showCartSlice';
import ProductContainer from '../components/ProductContainer';

export const CartLayout = ({ children }: { children: React.ReactNode }) => {
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
      <div className='flex'>
        <Sidebar />
        <MobileTab />
        <MobileCart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCancel={handleCancel}
          handleCheckout={handleCheckout}
          handleCloseCart={handleCloseCart}
          showCart={showCart}
        />
        <Cart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCancel={handleCancel}
          handleCheckout={handleCheckout}
        />
        <div className='w-full h-screen overflow-y-auto py-2 px-6'>
          <ProductContainer>{children}</ProductContainer>
        </div>
      </div>
    </>
  );
};
