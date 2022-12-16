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
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { savingAddress } from '../../lib/hot-toast';

const Account = ({ userData , userAddress}: { userData: IUserData, userAddress:null | IAddress }) => {
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
    defaultValues: userAddress? userAddress : {},
    resolver: yupResolver(userAddressValidation),
  });

  const onSubmit = async (data: IAddress) => {
    setIsDisabled(true);
    clearErrors();

     
    try {
      if(!userAddress){
        // register address for the first time
         await toast.promise(axios.post('/api/user', data), savingAddress);
      } else {
        // update existing address record
         await toast.promise(axios.put('/api/user', data), savingAddress);
      }

    } catch (error) {
      console.log(error)
      setIsDisabled(false);
    }
    
  };

  const handleCancel = () => {
    clearErrors()
    reset()
    setIsDisabled(true)
  }

  return (
  <>
  <Toaster position='top-center' reverseOrder={false} />
    <section className='mx-auto w-full md:w-8/12 mt-4 px-2'>
      <h2 className='text-lg text-center'>Account</h2>
      <div className='flex justify-around'>
        <button
          onClick={() => setActiveTab('info')}
          className={`border-b-2 transition-all ${ activeTab === 'info' && 'border-primary-400'}  w-full py-3`}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`border-b-2 transition-all ${activeTab === 'orders' && 'border-primary-400'}  w-full py-3`}
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
                <div className='flex gap-1 flex-col md:w-36'>
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
                <div className='flex gap-1 flex-col md:w-36'>
                  <label className='text-xs text-slate-500 '>State</label>
                  <input
                    className={`${isDisabled ? 'bg-slate-50' : ''} ${errors.state && 'border-b-red-800'}`}
                    type='text'
                    disabled={isDisabled}
                    {...register('state')}

                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-end   gap-2'>
              <Button disabled={isDisabled} type='button' title='CANCEL' className='disabled:border-slate-400 disabled:text-slate-400 rounded border border-primary-400 text-primary-400 hover:border-primary-900 hover:text-primary-900 ' onClick={handleCancel} />
              <Button disabled={isDisabled} type='submit' title='SAVE' className='disabled:bg-slate-400  bg-primary-500 hover:bg-primary-600 text-white rounded border md:w-36' onClick={()=> {}} />
            </div>
          </form>
        ) : (
          <article>orders</article>
        )}
      </div>
    </section></>
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


  const userAddress = await client.address.findUnique({
    where: {
      userId: session?.user.email!
    }
  })


  return {
    props: { userData, userAddress  },
  };
};
