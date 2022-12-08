import React from 'react';
import { MdList, MdEditNote, MdAdd } from 'react-icons/md';
import Link from 'next/link';
import AdminContainer from '../../components/AdminContainer';

const Admin = () => {
  return (
    <AdminContainer>
      <h2 className='text-lg font-semibold text-center text-slate-600'>
        ADMIN PANEL
      </h2>
      <div className='text-sm mt-8 flex flex-col items-center justify-center gap-6 mx-auto w-8/12 md:flex-row'>
        <Link
          href='/admin/add-product'
          className='w-44 h-28 flex gap-2 justify-center items-center rounded-md bg-white shadow-md hover:shadow-lg transition-all'
        >
          <span>Add Product</span>
          <MdAdd size={20} className='fill-slate-600' />
        </Link>
        <Link
          href='/admin/all-products'
          className='w-44 h-28 flex gap-2 justify-center items-center rounded-md bg-white shadow shadow-md hover:shadow-lg transition-all'
        >
          <span>All Products</span>
          <MdList size={20} className='fill-slate-600' />
        </Link>
      </div>
    </AdminContainer>
  );
};
export default Admin;
