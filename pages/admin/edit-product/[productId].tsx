import { GetServerSideProps } from 'next';
import { ChangeEvent, useRef, useState } from 'react';
import AdminContainer from '../../../components/AdminContainer';
import AdminHeading from '../../../components/AdminHeading';
import client from '../../../lib/prismadb';
import { ICategory, IProduct } from '../../../interfaces/Product';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidation } from '../../../lib/yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import Head from 'next/head';

const EditProduct = ({
  product,
  productList,
}: {
  product: IProduct;
  productList: ICategory[];
}) => {
  const [isPostingProd, setIsPostingProd] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const [img, setImg] = useState<string | null>(product.imageUrl);
  const [fileError, setFileError] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IProduct>({
    defaultValues: product,
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
    setIsPostingProd(true);
    clearErrors();

    if (fileRef.current?.files?.length === 0 && !img) {
      setFileError(true);
      setIsPostingProd(false);
    } else if (fileRef.current?.files?.length === 0 && img) {
      const productUpdate = {
        ...data,
        imageId: product.imageId,
        imageUrl: product.imageUrl,
        productId: product.productId,
      };
      await axios.put('/api/admin', productUpdate);
      handleDeleteImg();
      reset();

      toast.success('Product updated!');

      setTimeout(() => {
        router.push('/admin');
        setIsPostingProd(false);
      }, 3000);
    } else {
      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dggwpfsnj/image/upload',
          formData
        );
        const updateProduct = {
          ...data,
          imageId: uploadRes.data.public_id,
          imageUrl: uploadRes.data.secure_url,
          productId: product.productId,
        };

        await axios.put('/api/admin', updateProduct);
        handleDeleteImg();
        reset();
        setIsPostingProd(false);
        toast.success('Product updated!');
        setTimeout(() => {
          router.push('/admin');
          setIsPostingProd(false);
        }, 3000);
      } catch (error) {
        setIsPostingProd(false);
        toast.error('Something went wrong!');
        console.log(error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Edit Product</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AdminContainer>
        <AdminHeading title='Edit Product' />
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
              ${errors.category ? 'border-red-500' : 'border-gray-400'}
              capitalize
              p-2
              rounded-md
              border
              focus:outline-none
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
                className={`${
                  errors.name ? 'border-red-500' : 'border-gray-400'
                }
                p-2
                rounded-md
                border
                focus:outline-none
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
                step='0.01'
                min={0}
                type='number'
                name='price'
                className={`
              ${errors.price ? 'border-red-500' : 'border-gray-400'}
              p-2
              rounded-md
              border
              focus:outline-none
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
                className={`${fileError ? 'border-red-500' : 'border-gray-400'} 
              p-2 
              rounded-md 
              border 
              m-0 
              focus:outline-none
             `}
                type='file'
                id='image'
              />
            </div>
            {img && (
              <div className='w-20 h-20 relative'>
                <Image
                  className='rounded-md'
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
            <button
              type='submit'
              className='disabled:bg-slate-500 disabled:text-white inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            >
              Send
            </button>
          </fieldset>
        </form>
      </AdminContainer>
    </>
  );
};
export default EditProduct;

EditProduct.PageLayout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx?.params?.productId as string;

  const product = await client.product.findUnique({
    where: {
      productId: productId,
    },
  });

  if (!product) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin',
      },
    };
  }

  const productList = await client.category.findMany();

  return {
    props: {
      product,
      productList,
    },
  };
};
