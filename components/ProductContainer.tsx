import React from 'react';
import { useRouter } from 'next/router';

const ProductContainer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <section className='mt-6'>
      {router.pathname !== '/' && (
        <h1 className='text-xl text-center md:text-start font-semibold text-neutral-700 mb-8'>
          Customize
        </h1>
      )}
      <div className='flex justify-center md:justify-start flex-wrap items-center gap-8'>
        {children}
      </div>
    </section>
  );
};
export default ProductContainer;
