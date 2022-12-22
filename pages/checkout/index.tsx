import axios from 'axios';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import MainLayout from '../../layouts/MainLayout';
import client from '../../lib/prismadb';
import { RootState } from '../../store/store';
import { IAddress } from '../../interfaces/User';
import { authOptions } from '../api/auth/[...nextauth]';
import { cleanCart } from '../../features/cartSlice';
import { useAppDispatch } from '../../store/store';
import { orderingProduct } from '../../lib/hot-toast';
import CardOrder from '../../components/CardOrder';
import Head from 'next/head';

const Checkout = ({ userAddress }: { userAddress: IAddress }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);

  const { order, totalAmt } = useSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    setSendingOrder(true);
    try {
      await toast.promise(
        axios.post('/api/order', { order, paymentMethod }),
        orderingProduct
      );

      setTimeout(() => {
        dispatch(cleanCart());
        setPaymentMethod('');
        router.push('/sauces');
        setSendingOrder(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setSendingOrder(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <section className='mx-auto w-full flex gap-4 flex-col items-start justify-center sm:flex-row mt-6 px-2 '>
        <div className=' w-full sm:w-5/12 md:w-4/12 p1 rounded-md bg-white shadow-md'>
          <div className='p-3 space-y-4'>
            <div>
              <h2 className='font-semibold text-lg'>Address</h2>
              <div>
                {!userAddress ? (
                  <p>
                    <Link className='text-accent-400 underline' href='/account'>
                      Register an address
                    </Link>{' '}
                    to continue
                  </p>
                ) : (
                  <>
                    <p>
                      {userAddress?.street}, {userAddress?.number}
                    </p>
                    <p>
                      {userAddress.city} - {userAddress.state}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <h2 className='font-semibold mb-1'>Payment Method</h2>
              <fieldset
                disabled={order.length === 0 || sendingOrder}
                className='flex flex-col gap-2'
              >
                <p className='text-sm'>On Delivery</p>
                <div className='flex gap-2 items-center'>
                  <input
                    type='radio'
                    id='paymentMethod'
                    name='paymentMethod'
                    className='accent-primary-500'
                    value='cash'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor='paymentMethod'>Cash</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='radio'
                    id='paymentMethod'
                    name='paymentMethod'
                    className='accent-primary-500'
                    value='credit card'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={order.length === 0 || sendingOrder}
                  />
                  <label htmlFor='paymentMethod'>Credit card</label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className=' w-full sm:w-5/12 md:w-4/12 rounded-md bg-white shadow-md p-1'>
          <div className='p-3 space-y-2'>
            <div>
              <h2 className='text-center mb-1 '>Checkout</h2>
            </div>
            {order.length > 0 ? (
              <>
                {order.map((product) => (
                  <CardOrder key={product.productId} {...product} />
                ))}
                <div className='flex font-semibold justify-between pt-3'>
                  <span>Total</span> <span>$ {totalAmt.toFixed(2)}</span>
                </div>
                <div className='pt-2'>
                  <Button
                    onClick={handleSubmit}
                    className='bg-primary-500 rounded hover:bg-primary-600 w-full text-white disabled:bg-slate-400'
                    title='SEND'
                    disabled={!paymentMethod || sendingOrder}
                  />
                </div>
              </>
            ) : (
              <h3 className='text-center'>You have no items in your cart</h3>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

Checkout.PageLayout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session?.user.email) {
    return {
      redirect: {
        permanent: false,
        destination: '/sauces',
      },
    };
  }

  const userAddress = await client.address.findUnique({
    where: {
      userId: session?.user.email,
    },
  });

  return {
    props: { userAddress },
  };
};

export default Checkout;
