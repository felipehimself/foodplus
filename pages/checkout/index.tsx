import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import PageLoading from '../../components/PageLoading';
import MainLayout from '../../layouts/MainLayout';
import { RootState } from '../../store/store';

const Checkout = () => {
  const { order, totalAmt } = useSelector((state: RootState) => state.cart);
  // const { data: session, status  } = useSession();

  // const router = useRouter();

  // useEffect(() => {
  //   if ((status !== 'loading') && !session) {
  //     router.push('/signin?callback=/checkout');
  //   }
  // }, [session, router,status]);

  return (
    <>
      <section className='mx-auto w-full flex gap-4 flex-col items-start justify-center sm:flex-row mt-6 px-2 '>
        <div className=' w-full sm:w-5/12 md:w-4/12 p1 rounded-md bg-white shadow-md'>
          <div className='p-3 space-y-4'>
            <div>
              <h3 className='font-semibold'>Address</h3>
              <div>
                <label htmlFor='paymentMethod'>Pay on delivery</label>
                <input
                  type='radio'
                  id='paymentMethod'
                  className='accent-primary-500'
                />
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='font-semibold'>Payment Method</h3>
              <div className='flex gap-2 items-center'>
                <label htmlFor='paymentMethod'>On Delivery</label>
                <input
                  type='radio'
                  id='paymentMethod'
                  className='accent-primary-500'
                />
              </div>
              {/* <div className='flex gap-2 items-center'>
                <label htmlFor="paymentMethod">Cash</label>
                <input type='radio' id='paymentMethod' className='accent-primary-500' />
              </div>
              <div className='flex gap-2 items-center'>
                <label htmlFor="paymentMethod">Credit Card</label>
                <input type='radio' id='paymentMethod' className='accent-primary-500' />
              </div> */}
            </div>
          </div>
        </div>
        <div className=' w-full sm:w-5/12 md:w-4/12 rounded-md bg-white shadow-md p-1'>
          <div className='p-3 space-y-2'>
            <div>
              <h3 className='text-center font-semibold mb-1 '>Checkout</h3>
            </div>
            {order.map((product) => (
              <div className='flex gap-2 items-end' key={product.id}>
                <div className='-mb-2'>
                  <Image
                    src={product.imageUrl}
                    width={60}
                    height={60}
                    alt={product.name}
                  />
                </div>
                <div className='flex text-sm  items-end'>
                  <div>
                    <p>{product.name}</p>
                    <p>$ {product.price.toFixed(2)}</p>
                  </div>
                </div>
                <span className='text-sm flex-1 text-right'>
                  x {product.qty}
                </span>
              </div>
            ))}
            <div className='flex font-semibold justify-between pt-3'>
              <span>Total</span> <span>$ {totalAmt.toFixed(2)}</span>
            </div>
            <div className='pt-2'>
              <Button
                onClick={() => {}}
                className='bg-primary-500 rounded hover:bg-primary-600 w-full text-white'
                title='SEND'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Checkout.PageLayout = MainLayout


export default Checkout;
