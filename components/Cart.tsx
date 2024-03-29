import Image from 'next/image';
import Button from './Button';
import img from './..//public/image.jpeg';
import { MdClose } from 'react-icons/md';
const { motion, AnimatePresence } = require('framer-motion');
import { ICartProps } from '../interfaces/Props';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { listItemVarians } from '../lib/framer';

const Cart = ({
  cart,
  handleCancel,
  handleCheckout,
  handleRemoveFromCart,
}: ICartProps) => {
  return (
    <>
      <div className='text-sm w-80 px-2 pb-4 h-screen bg-zinc-50 hidden overflow-y-hidden flex-col justify-between gap-1 shadow-lg ml-[5rem] md:flex'>
        <div>
          <Image
            width={136}
            height={136}
            src={img}
            alt='salad bowl'
            className='block mx-auto'
          />
        <h3 className='text-center text-lg mt-1 font-semibold'>
          {cart.order.length !== 0 ? 'Your order' : 'Your cart is empty'}
        </h3>
        </div>

      {cart.order.length !== 0 && (<Scrollbars>
          <ul className='mt-2 px-3 overflow-x-hidden  flex-1'>
            <AnimatePresence >
              {cart.order.map((item) => {
                return (
                  <motion.li
                    className='flex mb-2 justify-between items-center  '
                    key={item.productId}
                    variants={listItemVarians}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                  >
                    <span className='font-semibold'>{item.name}</span>
                    <div className='flex items-center gap-1'>
                      <span className='text-xs text-slate-500'>
                        x {item.quantity}
                      </span>
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
        </Scrollbars>) 
      
      }
        
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
