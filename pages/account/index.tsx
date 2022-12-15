import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { IUserData } from '../../types/User';
import { MdEditNote } from 'react-icons/md';
import client from '../../lib/prismadb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAddress } from '../../types/User';
import { userAddressValidation } from '../../lib/yup';
import Button from '../../components/Button';
import MainLayout from '../../layouts/MainLayout';

const Account = ({ userData }: { userData: IUserData }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isDisabled, setIsDisabled] = useState(true);

  // const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IAddress>({
    resolver: yupResolver(userAddressValidation),
  });

  const onSubmit = async (data: IAddress) => {
   
    clearErrors();
    console.log(data);
    
  };

  const handleCancel = () => {
    clearErrors()
    reset()
    setIsDisabled(true)
  }

  

  return (
    <section className='mx-auto w-full md:w-8/12 mt-4 p-2'>
      <h2 className='text-lg text-center mb-2 '>Account</h2>
      <div className='flex justify-around'>
        <button
          onClick={() => setActiveTab('info')}
          className={`border-b-2 transition-all ${ activeTab === 'info' && 'border-primary-400'}  w-full py-1`}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`border-b-2 transition-all ${activeTab === 'orders' && 'border-primary-400'}  w-full py-1`}
        >
          Orders
        </button>
      </div>
      <div className='mt-4 bg-white '>
        {activeTab === 'info' ? (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-3'>
              <h1 className='font-semibold text-sm'>General</h1>
              <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex gap-1 flex-col md:w-full'>
                  <label className='text-xs text-slate-500'>Name</label>
                  <input
                    className='
                    p-2 rounded 
                    border
                    m-0
                    focus:outline-none
                    disabled:bg-slate-50
                    '
                    type='text'
                    disabled
                    value={userData.name}
                  />
                </div>
                <div className='flex gap-1 flex-col md:w-full'>
                  <label className='text-xs text-slate-500'>Email</label>
                  <input
                    className='
                    p-2 rounded 
                    border
                    m-0
                    focus:outline-none
                    disabled:bg-slate-50
                    '
                    type='text'
                    disabled
                    value={userData.email}
                  />
                </div>
              </div>
            </div>
            <div className='space-y-3'>
              <h1 className='font-semibold text-sm flex items-center justify-between'>
                <span>Address</span>
                <button type='button' onClick={() => setIsDisabled(false)}>
                  <MdEditNote size={22} />
                </button>
              </h1>
              <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex gap-1 flex-col md:w-full'>
                  <label className='text-xs text-slate-500'>Street</label>
                  <input
                    className={`${isDisabled ? 'bg-slate-50' : ''} ${errors.street && 'border-b-red-800'}`}
                    type='text'
                    disabled={isDisabled}
                    {...register('street')}
                  />
                </div>
                <div className='flex gap-1 flex-col'>
                  <label className='text-xs text-slate-500'>Number</label>
                  <input
                    className={`${isDisabled ? 'bg-slate-50' : ''} ${errors.number && 'border-b-red-800'}`}
                    type='number'
                    min={0}
                    disabled={isDisabled}
                    {...register('number')}

                  />
                </div>
              </div>
              <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex gap-1 flex-col md:w-full'>
                  <label className='text-xs text-slate-500'>City</label>
                  <input
                    className={`${isDisabled ? 'bg-slate-50' : ''} ${errors.city && 'border-b-red-800'}`}
                    type='text'
                    disabled={isDisabled}
                    {...register('city')}

                  />
                </div>
                <div className='flex gap-1 flex-col'>
                  <label className='text-xs text-slate-500'>State</label>
                  <input
                    className={`${isDisabled ? 'bg-slate-50' : ''} ${errors.state && 'border-b-red-800'}`}
                    type='text'
                    disabled={isDisabled}
                    {...register('state')}

                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col md:flex-row   gap-2'>
              <Button disabled={isDisabled} type='button' title='CANCEL' className='disabled:border-slate-400 disabled:text-slate-400 rounded border border-primary-400 text-primary-400 hover:border-primary-900 hover:text-primary-900 ' onClick={handleCancel} />
              <Button disabled={isDisabled} type='submit' title='SAVE' className='disabled:bg-slate-400 bg-primary-500 hover:bg-primary-600 text-white rounded border md:w-36' onClick={()=> {}} />
            </div>
          </form>
        ) : (
          <article>orders</article>
        )}
      </div>
    </section>
  );
};

Account.PageLayout = MainLayout


export default Account;

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

  const userData = await client.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  return {
    props: { userData },
  };
};
