import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useAppDispatch } from '../store/store';
import { toggleShowCart } from '../features/showCartSlice';
import {
  FaCarrot,
  FaCheese,
  FaSeedling,
  FaWineBottle,
  FaAppleAlt,
  FaShoppingCart,
} from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';

import { RiAdminFill, RiUserFill } from 'react-icons/ri';

const menuItems = [
  { item: 'sauces', icon: <FaWineBottle size={18} />, path: 'sauces' },
  { item: 'veggies', icon: <FaCarrot size={18} />, path: 'veggies' },
  { item: 'cheese', icon: <FaCheese size={15} />, path: 'cheese' },
  { item: 'crunch', icon: <FaSeedling size={18} />, path: 'crunch' },
  { item: 'extras', icon: <FaAppleAlt size={18} />, path: 'extras' },
];

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const handleShowCart = () => {
    dispatch(toggleShowCart(true));
  };

  const cancelOrder = () => {
    router.push('/sauces');
  };

  console.log(session);

  return (
    <nav className='bg-gradient-to-b from-orange-600 to-orange-500  w-20 fixed left-0 h-screen text-white flex flex-col justify-between  py-8 gap-6'>
      <div className='flex flex-col gap-12'>
        <div className='flex justify-center h-[26px]'>
          <button onClick={handleShowCart} className=' md:hidden'>
            <FaShoppingCart size={22} />
          </button>
        </div>
        <ul className='flex flex-col gap-6'>
          {menuItems.map((menuItem, ind) => (
            <li key={menuItem.item} className='relative overflow-hidden'>
              <Link
                className='flex flex-col justify-center items-center uppercase gap-2'
                href={`/${menuItem.path}`}
              >
                {menuItems[ind]?.icon}
                <span className='text-xs'>{menuItem?.item}</span>
              </Link>
              <div
                className={`
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                first-letter:border-solid
                border-r-zinc-50
                border-r-[10px]
                border-y-transparent
                border-y-[10px]
                border-l-0
                transition-all
                ${
                  router.pathname.includes(menuItem.path)
                    ? 'opacity-100'
                    : 'opacity-0'
                }
                `}
              ></div>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col space-y-4'>
        {status !== 'loading' &&
          (session ? (
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
              <button onClick={() => signOut()} className='mx-auto '>
                <IoLogOut size={24} />
              </button>
            </>
          ) : (
            <Link href='/signin' className='flex flex-col items-center gap-1'>
              <RiUserFill size={24} />
              <span className='text-xs'>Login</span>
            </Link>
          ))}
      </div>
    </nav>
  );
};
export default Sidebar;
