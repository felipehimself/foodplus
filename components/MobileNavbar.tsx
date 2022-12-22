import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import LoadingIcons from 'react-loading-icons';
import { IoLogOut } from 'react-icons/io5';
import { RiAdminFill, RiUserFill } from 'react-icons/ri';
import { RootState, useAppDispatch } from '../store/store';
import { toggleShowCart } from '../features/showCartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const MobileNavbar = () => {
  const { back, asPath, pathname } = useRouter();
  const { data: session, status } = useSession();

  const callback = pathname.substring(1);

  const dispatch = useAppDispatch();

  const {order} = useSelector((state:RootState)=> state.cart)

  return (
    <header className='bg-primary-500 py-1 sticky top-0 z-40 md:hidden'>
      <nav
        className={`w-full px-2 ${
          asPath.includes('all-product') ? 'md:w-11/12 md:px-8' : 'md:w-8/12'
        } py-4 text-white mx-auto flex justify-between`}
      >
        <Link href='/sauces' className='font-semibold'>
          FoodPlus
        </Link>

        <div className='flex items-center gap-4'>
        <div className='flex justify-center h-[1.625rem]'>
          {session && <button onClick={()=>dispatch(toggleShowCart(true))} className='md:hidden relative'>
            <FaShoppingCart size={22} />
            {order.length > 0 && (
              <span className='absolute top-0 -right-1 text-xs bg-yellow-400 p-1 rounded-full text-neutral-500'></span>
            )}
          </button>}
        </div>

          {status === 'loading' && (
            <LoadingIcons.Circles height={24} width={24} />
          )}

          {session && (
            <>
              {session?.user.role === 'admin' ? (
                <Link
                  href='/admin'
                  className='flex flex-col items-center gap-1'
                >
                  <RiAdminFill size={24} />
                </Link>
              ) : (
                <Link
                  href='/account'
                  className='flex flex-col items-center gap-1'
                >
                  <RiUserFill size={24} />
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className='mx-auto flex flex-col items-center gap-1'
              >
                <IoLogOut size={24} />
              </button>
            </>
          )}

          {status !== 'loading' && !session && (
            <Link
              href={`/signin?callback=${callback}`}
              className='flex flex-col items-center gap-1'
            >
              <RiUserFill size={24} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default MobileNavbar;
