import React, { ChangeEvent, useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { IProduct } from '../../types/Product';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidation } from '../../lib/yup';
import { IImage, ICategory } from '../../types/Product';
import axios from 'axios';
import AdminHeading from '../../components/AdminHeading';
import AdminContainer from '../../components/AdminContainer';
import client from '../../lib/prismadb';
import toast, { Toaster } from 'react-hot-toast';

const AddProduct = ({ productList }: { productList: ICategory[] }) => {
  const [image, setImage] = useState<IImage | null>(null);
  const [isPostingImg, setIsPostingImg] = useState(false);
  const [isPostingProd, setIsPostingProd] = useState(false);

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

  const handleCreate = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsPostingImg(true);
    setImage(null);
    const file = e.target.files![0];
    const data = new FormData();

    data.append('file', file);
    data.append('upload_preset', 'foodplus');

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dggwpfsnj/image/upload',
        data
      );

      setImage({
        imageUrl: uploadRes.data.secure_url,
        imageId: uploadRes.data.public_id,
      });
      toast.success('Image uploaded!');

      setIsPostingImg(false);
    } catch (error) {
      setIsPostingImg(false);
      toast.error('Something went wrong!');

      console.log(error);
    }
  };

  const checkError = (): boolean => {
    return Object.keys(errors).length > 0;
  };

  const onSubmit = async (data: IProduct) => {
    setIsPostingProd(true);
    clearErrors();

    try {
      const product = {
        ...data,
        imageId: image?.imageId,
        imageUrl: image?.imageUrl,
      };

      await axios.post('/api/admin', product);
      setIsPostingProd(false);
      reset();
      setImage(null);
      if (fileRef.current) {
        fileRef.current.value = '';
      }
      setIsPostingImg(false);
      toast.success('Product saved!');
    } catch (error) {
      setIsPostingImg(false);
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
          disabled={isPostingImg || isPostingProd}
          className='mx-auto lg:w-4/12 flex flex-col gap-4 '
        >
          <div className='flex flex-col gap-1 text-sm'>
            <label htmlFor='type' className='text-slate-600'>
              Type
            </label>
            <select
              {...register('category')}
              name='category'
              id='type'
              className='
              capitalize 
              form-select
              appearance-none
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              aria-label='Default select example'
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
              className='
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                '
              id='name'
              placeholder=''
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
              type='number'
              name='price'
              className='
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                '
              id='price'
              placeholder=''
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
              onChange={handleCreate}
              ref={fileRef}
              className='form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
             focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='image'
            />
          </div>
          <small className='text-center text-sm text-red-500 h-[20px]'>
            {checkError() && '* All fields are required'}
          </small>
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
