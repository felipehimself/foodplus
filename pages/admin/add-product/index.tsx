import React, { ChangeEvent, useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { IProduct } from '../../../interfaces/Product';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidation } from '../../../lib/yup';
import { ICategory } from '../../../interfaces/Product';
import axios from 'axios';
import AdminHeading from '../../../components/AdminHeading';
import AdminContainer from '../../../components/AdminContainer';
import client from '../../../lib/prismadb';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import Button from '../../../components/Button';
import MainLayout from '../../../layouts/MainLayout';
import { savingProduct } from '../../../lib/hot-toast';
import Head from 'next/head';

const AddProduct = ({ productList }: { productList: ICategory[] }) => {
  const [isPostingProd, setIsPostingProd] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
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

  const handleGetImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFormData = new FormData();
    const file = e.target.files![0];
    imgFormData.append('file', file);
    imgFormData.append('upload_preset', 'foodplus');
    setFormData(imgFormData);
    setImg(URL.createObjectURL(file));
  };

  const handleDeleteImg = () => {
    setImg(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const onSubmit = async (data: IProduct) => {
    setFileError(false);

    if (fileRef.current?.files?.length === 0) {
      setFileError(true);
      return;
    }

    clearErrors();
    setIsPostingProd(true);

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dggwpfsnj/image/upload',
        formData
      );

      const product = {
        ...data,
        imageId: uploadRes.data.public_id,
        imageUrl: uploadRes.data.secure_url,
      };

      await toast.promise(axios.post('/api/admin', product), savingProduct);

      handleDeleteImg();
      reset();
      setIsPostingProd(false);
      setFormData(null);
    } catch (error) {
      setIsPostingProd(false);
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Product</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AdminContainer>
        <AdminHeading title='Add Product' />
        <form onSubmit={handleSubmit(onSubmit)} className='px-2 '>
          <fieldset
            disabled={isPostingProd}
            className='mx-auto md:w-8/12 lg:w-4/12 flex flex-col gap-5 group'
          >
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='type'>Category</label>
              <select
                {...register('category')}
                name='category'
                id='type'
                className={`
              ${errors.category ? 'border-b-red-800' : ''}
              capitalize
            
              `}
                aria-label='Select category'
              >
                {productList.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='name'>Name</label>
              <input
                {...register('name')}
                type='text'
                name='name'
                className={errors.name ? 'border-b-red-800' : ''}
                id='name'
              />
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='price'>Price</label>
              <input
                {...register('price')}
                step='0.01'
                min={0}
                type='number'
                name='price'
                className={errors.price ? 'border-b-red-800' : ''}
                id='price'
              />
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='image'>Image</label>
              <input
                onChange={handleGetImage}
                ref={fileRef}
                className={fileError ? 'border-b-red-800' : ''}
                type='file'
                id='image'
              />
            </div>
            {img && (
              <div className='w-20 h-20 relative'>
                <Image
                  className='rounded'
                  width={80}
                  height={80}
                  src={img}
                  alt='product image'
                />
                <button
                  onClick={handleDeleteImg}
                  className='absolute flex justify-center items-center bg-neutral-500 text-white rounded-full p-1 -right-2 -top-2 shadow-md hover:shadow-lg transition-all'
                >
                  <MdClose size={12} />
                </button>
              </div>
            )}
            <Button
              title='SEND'
              onClick={() => {}}
              className='disabled:bg-slate-400 bg-primary-500 text-white rounded  hover:bg-primary-600'
            />
          </fieldset>
        </form>
      </AdminContainer>
    </>
  );
};
export default AddProduct;

AddProduct.PageLayout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productList = await client.category.findMany();

  return {
    props: {
      productList,
    },
  };
};
