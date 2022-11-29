import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import { FaCarrot, FaCheese, FaSeedling } from 'react-icons/fa';
import { FaWineBottle } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { MdArrowBackIos } from 'react-icons/md';
import { FaAppleAlt } from 'react-icons/fa';

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

  const cancelOrder = () => {
    router.push('/sauces');
  };

  return (
    <nav className='bg-gradient-to-b from-orange-600 to-orange-500  w-20 fixed left-0 h-screen text-white flex flex-col justify-between py-8 gap-6'>
      <div className='flex flex-col gap-12'>
        <button
          onClick={() => cancelOrder()}
          className='flex flex-col justify-center items-center uppercase gap-2 '
        >
          <MdArrowBackIos size={20} />
          <span className='text-xs'>Cancel</span>
        </button>
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
                  router.pathname == '/' + menuItem.path
                    ? 'opacity-100'
                    : 'opacity-0'
                }
                `}
              ></div>
            </li>
          ))}
        </ul>
      </div>
      <div className='mx-auto'>
        {session?.user.role === 'admin' && (
          <Link href='/admin'>
            <RiAdminFill size={24} />
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Sidebar;
