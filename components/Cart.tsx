import Image from 'next/image';
import Button from './Button';
import img from './..//public/image.jpeg';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MdClose } from 'react-icons/md';
import { useAppDispatch } from '../store/store';
import { removeFromCart, cleanCart } from '../features/cartSlice';



const { motion, AnimatePresence } = require('framer-motion');

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const Cart = ({ showCart }: { showCart: boolean }) => {
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
    toast.success('Item removed!');
  };

  const handleCancel = () => {
    dispatch(cleanCart());
    toast.success('Your cart was cleaned!');
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />

      <div
        className={`overflow-y-hidden text-sm fixed z-10 transition-all ${
          showCart ? 'left-0' : '-left-full'
        } w-72 px-4 pb-4 h-screen bg-zinc-50 flex  flex-col gap-1 shadow-lg md:static md:shadow-none`}
      >
        <div>
          <Image
            width={136}
            height={136}
            src={img}
            alt='salad bowl'
            className='block mx-auto'
          />
        </div>

        <h3 className='text-center text-lg  font-semibold'>
          {cart.order.length !== 0 ? 'Your order' : 'Your cart is empty'}
        </h3>

        <ul className='mt-2 overflow-x-hidden overflow-y-auto h-1/2'>
          <AnimatePresence initial={false}>
            {cart.order.map((item) => {
              return (
                <motion.li
                  className='flex mb-2 justify-between items-center  '
                  key={item.id}
                  initial={{ x: '-100%' , opacity: 0}}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className='font-semibold'>{item.name}</span>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-slate-500'>x {item.qty}</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className='group'
                    >
                      <MdClose
                        className='transition-all fill-red-600 group-hover:fill-red-800'
                        size={18}
                      />
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        <AnimatePresence initial={false}>
          {cart.order.length !== 0 && (
            <>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'tween' }}
                className='space-y-2 mt-2'
              >
                <hr />
                <p className='text-center font-semibold '>
                  TOTAL $ {cart.totalAmt.toFixed(2)}
                </p>
                <Button
                  onClick={handleCheckout}
                  title='CHECK OUT'
                  className='w-full rounded bg-primary-500 hover:bg-primary-600 text-white'
                />
                <Button
                  onClick={handleCancel}
                  title='CANCEL'
                  className='w-full rounded border border-primary-400 text-primary-400 hover:border-primary-900 hover:text-primary-900 '
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default Cart;
