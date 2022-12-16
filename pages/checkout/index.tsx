import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import PageLoading from '../../components/PageLoading';
import MainLayout from '../../layouts/MainLayout';
import client from '../../lib/prismadb';
import { RootState } from '../../store/store';
import { IAddress } from '../../types/User';
import { authOptions } from '../api/auth/[...nextauth]';

const Checkout = ({ userAddress }: { userAddress: IAddress }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

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
            <div className='space-y-2'>
              <h2 className='font-semibold'>Payment Method</h2>
              <div className='flex gap-2 items-center'>
                <label htmlFor='paymentMethod' className='text-sm'>
                  On Delivery
                </label>
                <input
                  type='radio'
                  id='paymentMethod'
                  className='accent-primary-500'
                  value='on delivery'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={order.length === 0}
                />
              </div>
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
                    className='bg-primary-500 rounded hover:bg-primary-600 w-full text-white disabled:bg-slate-400'
                    title='SEND'
                    disabled={!paymentMethod || !paymentMethod}
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
