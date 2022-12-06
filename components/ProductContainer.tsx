import React from 'react';

const ProductContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='mt-10'>
      <h1 className='text-2xl font-semibold text-neutral-700 mb-10'>Customize</h1>
      <div className='flex flex-wrap  items-center gap-5  lg:flex-row'>
        {children}
      </div>
    </section>
  );
};
export default ProductContainer;
