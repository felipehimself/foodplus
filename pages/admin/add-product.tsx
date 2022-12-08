import React, { ChangeEvent, useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { IProduct } from '../../types/Product';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidation } from '../../lib/yup';
import { ICategory } from '../../types/Product';
import axios from 'axios';
import AdminHeading from '../../components/AdminHeading';
import AdminContainer from '../../components/AdminContainer';
import client from '../../lib/prismadb';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';

const AddProduct = ({ productList }: { productList: ICategory[] }) => {
  const [isPostingProd, setIsPostingProd] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [fileError, setFileError] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IProduct>({
    resolver: yupResolver(productValidation),
  });

  const imgFormData = new FormData();

  const handleGetImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    imgFormData.append('file', file);
    imgFormData.append('upload_preset', 'foodplus');
    setImg(URL.createObjectURL(file));
  };

  const handleDeleteImg = () => {
    setImg(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  const onSubmit = async (data: IProduct) => {
    setFileError(false);
    clearErrors();

    if (fileRef.current?.files?.length === 0) {
      setFileError(true);
      return;
    }
    clearErrors();
    setIsPostingProd(true);

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dggwpfsnj/image/upload',
        imgFormData
      );

      const product = {
        ...data,
        imageId: uploadRes.data.public_id,
        imageUrl: uploadRes.data.secure_url,
      };

      await axios.post('/api/admin', product);
      handleDeleteImg()
      reset();
      setIsPostingProd(false);
      toast.success('Product saved!');
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <AdminContainer>
      <Toaster position='top-right' reverseOrder={false} />
      <AdminHeading title='Add Product' />
      <form onSubmit={handleSubmit(onSubmit)} className='px-2'>
        <fieldset
          disabled={isPostingProd}
          className='mx-auto lg:w-4/12 flex flex-col gap-4 '
        >
          <div className='flex flex-col gap-1 text-sm'>
            <label htmlFor='type' className='text-slate-600'>
              Category
            </label>
            <select
              {...register('category')}
              name='category'
              id='type'
              className={`
              ${errors.category && 'border-red-500'}
              capitalize
              p-2
              rounded-md
              border
              border-gray-400
              focus:outline-none
                focus:border-blue-800`}
              aria-label='Select category'
            >
              {productList.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1 text-sm'>
            <label
              htmlFor='name'
              className='form-label inline-block  text-gray-700'
            >
              Name
            </label>
            <input
              {...register('name')}
              type='text'
              name='name'
              className={`${errors.name && 'border-red-500'}
                p-2
                rounded-md
                border
                border-gray-400
                focus:outline-none
                focus:border-blue-800
                `}
              id='name'
            />
          </div>
          <div className='flex flex-col gap-1 text-sm'>
            <label
              htmlFor='price'
              className='form-label inline-block  text-gray-700'
            >
              Price
            </label>
            <input
              {...register('price')}
              step="0.01"
              min={0}
              type='number'
              name='price'
              className={`
              ${errors.price && 'border-red-500'}
              p-2
              rounded-md
              border
              border-gray-400
              focus:outline-none
                focus:border-blue-800
              `}
              id='price'
            />
          </div>
          <div className='flex flex-col gap-1 text-sm'>
            <label
              htmlFor='image'
              className='form-label inline-block mb-2 text-gray-700'
            >
              Image
            </label>
            <input
              onChange={handleGetImage}
              ref={fileRef}
              className={`${
                fileError && 'border-red-500'
              } p-2 rounded-md border border-gray-400
              m-0 focus:outline-none
              focus:border-blue-800
             `}
              type='file'
              id='image'
            />
          </div>
          {img && (
            <div className='w-20 h-20 relative'>
              <Image className='rounded-md' width={80} height={80} src={img} alt='product image' />
              <button onClick={handleDeleteImg} className='absolute flex justify-center items-center bg-neutral-500 text-white rounded-full p-1 -right-2 -top-2 shadow-md hover:shadow-lg transition-all'>
                <MdClose size={12} />
              </button>
            </div>
          )}
          <button
            type='submit'
            className='disabled:bg-slate-500 disabled:text-white inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Send
          </button>
        </fieldset>
      </form>
    </AdminContainer>
  );
};
export default AddProduct;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productList = await client.category.findMany();

  return {
    props: {
      productList,
    },
  };
};
