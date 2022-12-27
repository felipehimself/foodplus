import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { IoLogOut } from 'react-icons/io5';
import { RiAdminFill, RiUserFill } from 'react-icons/ri';
import { IoMdHome } from 'react-icons/io';
import { menuItems } from '../utils/menu';
import LoadingIcons from 'react-loading-icons';

const Sidebar = () => {
  const { pathname } = useRouter();

  const { data: session, status } = useSession();

  const callback = pathname.substring(1);

  return (
    <nav className='bg-gradient-to-b from-primary-600 to-primary-500 w-20 hidden fixed left-0 h-screen text-white md:flex flex-col justify-between  py-8 gap-6'>
        <Link href='/' className='flex flex-col justify-center items-center'>
          <IoMdHome size={26} />
          <span className='text-sm'>Home</span>
        </Link>
      
        <ul className='flex flex-col gap-5'>
          {menuItems.map((menuItem) => (
            <li key={menuItem.item} className='relative overflow-hidden'>
              <Link
                className='flex flex-col justify-center items-center capitalize gap-1'
                href={`/${menuItem.path}`}
              >
                {menuItem.icon}
                <span className='text-sm'>{menuItem?.item}</span>
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
                  pathname.includes(menuItem.path)
                    ? 'opacity-100'
                    : 'opacity-0'
                }
                `}
              ></span>
            </li>
          ))}
        </ul>
      

      <div className='flex flex-col items-center space-y-4'>
        {status === 'loading' && (
          <LoadingIcons.Circles height={24} width={24} />
        )}

        {session && (
          <>
            {session?.user.role === 'admin' ? (
              <Link href='/admin' className='flex flex-col items-center gap-1'>
                <RiAdminFill size={24} />
                <span className='text-sm'>Admin</span>
              </Link>
            ) : (
              <Link
                href='/account'
                className='flex flex-col items-center gap-1'
              >
                <RiUserFill size={24} />
                <span className='text-sm'>Account</span>
              </Link>
            )}
            <button
              onClick={() => signOut()}
              className='mx-auto flex flex-col items-center gap-1'
            >
              <IoLogOut size={24} />
              <span className='text-sm'>Logout</span>
            </button>
          </>
        )}

        {status !== 'loading' && !session && (
          <Link
            href={`/signin?callback=${callback}`}
            className='flex flex-col items-center gap-1'
          >
            <RiUserFill size={24} />
            <span className='text-sm'>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Sidebar;
