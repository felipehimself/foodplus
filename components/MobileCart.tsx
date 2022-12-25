import Button from './Button';
import { MdClose } from 'react-icons/md';
const { motion, AnimatePresence } = require('framer-motion');
import { ICartProps } from '../interfaces/Props';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { cartModalVariants, cardContentVariants } from '../lib/framer';

const MobileCart = ({
  cart,
  handleCancel,
  handleCheckout,
  handleCloseCart,
  showCart,
  handleRemoveFromCart,
}: ICartProps) => {
  return (
    <>
      <AnimatePresence>
        {showCart && (
          <motion.div
            onClick={handleCloseCart}
            className='md:hidden flex backdrop-blur-[1px] bg-[rgba(0,0,0,0.2)] fixed inset-0 z-50'
            variants={cartModalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <motion.div
              onClick={(e: Event) => e.stopPropagation()}
              variants={cardContentVariants}
              className='text-sm z-50 p-4 h-5/6 w-full mx-auto fixed bottom-0 bg-zinc-50 flex flex-col gap-1 shadow-lg rounded-t-xl'
            >
              <button onClick={handleCloseCart} className='self-end p-1'>
                <MdClose size={20} />
              </button>
              <h3 className='text-center text-lg  font-semibold'>
                {cart.order.length !== 0 ? 'Your order' : 'Your cart is empty'}
              </h3>
              <Scrollbars>
                <ul className='mt-2 flex-1 overflow-x-hidden overflow-y-auto '>
                  <AnimatePresence initial={false}>
                    {cart.order.map((item) => {
                      return (
                        <motion.li
                          className='flex mb-2 justify-between items-center  '
                          key={item.productId}
                          initial={{ x: '-100%', opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: '-100%', opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <span className='font-semibold'>{item.name}</span>
                          <div className='flex items-center gap-1'>
                            <span className='text-xs text-slate-500'>
                              x {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveFromCart(item.productId)
                              }
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
              </Scrollbars>
              <AnimatePresence initial={false}>
                {cart.order.length !== 0 && (
                  <>
                    <motion.div
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                      transition={{ type: 'tween' }}
                      className='space-y-2 mt-auto'
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default MobileCart;
