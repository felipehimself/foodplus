import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { toggleShowCart } from '../features/showCartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { RiAdminFill, RiUserFill } from 'react-icons/ri';
import { menuItems } from '../utils/menu';
import LoadingIcons from 'react-loading-icons'

const Sidebar = () => {
  const router = useRouter();
  const { pathname } = router;

  const { data: session, status } = useSession();
  
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.order);
  
  const callback = pathname.substring(1)

  const handleShowCart = () => {
    dispatch(toggleShowCart(true));
  };


  return (
    <nav className='bg-gradient-to-b from-primary-600 to-primary-500 w-16 md:w-20 fixed left-0 h-screen text-white flex flex-col justify-between  py-8 gap-6'>
      <div className='flex flex-col gap-12'>
        <div className='flex justify-center h-[1.625rem]'>
          <button onClick={handleShowCart} className='md:hidden relative'>
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className='absolute top-0 -right-1 text-xs bg-yellow-400 p-1 rounded-full text-neutral-500'></span>
            )}
          </button>
        </div>
        <ul className='flex flex-col gap-6'>
          {menuItems.map((menuItem, index) => (
            <li key={menuItem.item} className='relative overflow-hidden'>
              <Link
                className='flex flex-col justify-center items-center uppercase gap-2'
                href={`/${menuItem.path}`}
              >
                {menuItems[index]?.icon}
                <span className='text-2xs md:text-xs'>{menuItem?.item}</span>
              </Link>
              <span
                className={`
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                first-letter:border-solid
                border-r-zinc-50
                border-r-[0.625rem]
                border-y-transparent
                border-y-[0.625rem]
                border-l-0
                transition-all
                ${
                  router.pathname.includes(menuItem.path)
                    ? 'opacity-100'
                    : 'opacity-0'
                }
                `}
              ></span>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col items-center space-y-4'>

         {status === 'loading' && <LoadingIcons.Circles height={24} width={24} />}
        
          {(session && (
            <>
              {session?.user.role === 'admin' ? (
                <Link
                  href='/admin'
                  className='flex flex-col items-center gap-1'
                >
                  <RiAdminFill size={24} />
                  <span className='text-xs'>Admin</span>
                </Link>
              ) : (
                <Link
                  href='/account'
                  className='flex flex-col items-center gap-1'
                >
                  <RiUserFill size={24} />
                  <span className='text-xs'>Account</span>
                </Link>
              )}
              <button onClick={() => signOut()} className='mx-auto flex flex-col items-center gap-1'>
                <IoLogOut size={24} />
                  <span className='text-xs'>Logout</span>
              </button>
            </>
          ))}

           {(status !== 'loading') && !session &&
           
            <Link
              href={`/signin?callback=${callback}`}
              className='flex flex-col items-center gap-1'
            >
              <RiUserFill size={24} />
              <span className='text-xs'>Login</span>
            </Link>
          
           }
      </div>
    </nav>
  );
};
export default Sidebar;
