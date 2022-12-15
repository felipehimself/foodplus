import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

const Navbar = () => {
  const { back, asPath } = useRouter();

  return (
    <header className='bg-primary-500'>
      <nav
        className={`w-full px-2 ${
          asPath.includes('all-product') ? 'md:w-11/12 md:px-8' : 'md:w-8/12'
        } py-4 text-white mx-auto  flex justify-between`}
      >
        <Link href='/sauces' className='font-semibold'>
          FoodPlus
        </Link>
        <button onClick={() => back()}><MdArrowBack size={22} /></button>
      </nav>
    </header>
  );
};
export default Navbar;
