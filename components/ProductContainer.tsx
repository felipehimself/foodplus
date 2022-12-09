import React from 'react';

const ProductContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='mt-6'>
      <h1 className='text-2xl font-semibold text-neutral-700 mb-8'>Customize</h1>
      <div className='flex flex-wrap items-center gap-8  lg:flex-row'>
        {children}
      </div>
    </section>
  );
};
export default ProductContainer;
