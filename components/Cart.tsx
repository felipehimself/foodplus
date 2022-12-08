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

const Cart = ({ showCart }: { showCart: boolean }) => {
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
    toast.success('Item removed!');
  };

  const handleCancel = () => {
    dispatch(cleanCart())
    toast.success('Your cart was cleaned!');

  }

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />

      <div
        className={`text-sm fixed z-50 transition-all ${
          showCart ? 'left-0' : '-left-full'
        } w-72 px-4 pb-4 h-screen bg-zinc-50 flex justify-between flex-col gap-1 shadow-lg md:static md:shadow-none`}
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

        <h3 className='text-center text-lg text-neutral-600 font-semibold'>
          {cart.order.length !== 0 ? 'Your order' : 'Your cart is empty'}
        </h3>

        <ul className='mt-2 overflow-x-hidden overflow-y-auto h-1/2'>
          <AnimatePresence>
            {cart.order.map((item) => {
              return (
                <motion.li
                  className='flex mb-2 justify-between items-center text-neutral-600 '
                  key={item.id}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
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
        <hr />
        {cart.order.length !== 0 && (
          <div className='space-y-2 mt-2'>
            <p className='text-center font-semibold text-neutral-600'>
              TOTAL $ {cart.totalAmt.toFixed(2)}
            </p>

            <Button
            onClick={()=> {}}
              title='FINISH'
              className='w-full bg-orange-500 hover:bg-orange-600 text-white'
            />

            <Button
              onClick={handleCancel}
              title='CANCEL'
              className='w-full border border-orange-800 text-orange-800 hover:bg-orange-800 hover:text-white'
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
