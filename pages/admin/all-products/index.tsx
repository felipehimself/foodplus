import { useState } from 'react';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { IProduct } from '../../../interfaces/Product';
import AdminContainer from '../../../components/AdminContainer';
import AdminHeading from '../../../components/AdminHeading';
import client from '../../../lib/prismadb';
import axios from 'axios';
import { MdEditNote, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import MainLayout from '../../../layouts/MainLayout';
import { deletingProduct } from '../../../lib/hot-toast';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AllProducts = ({ products }: { products: IProduct[] }) => {
  const [allProducts, setAllProducts] = useState(products);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const header = [
    'Product Id',
    'Category',
    'Name',
    'Price',
    'Image ID',
    'Image URL',
  ];

  const handleDelete = async (productId: string, imageId: string) => {
    setIsDeleting(true);
    try {
      await toast.promise(
        axios.delete(`/api/admin?productId=${productId}&imageId=${imageId}`),
        deletingProduct
      );
      setAllProducts((prev) => {
        return prev.filter((prod) => prod.productId !== productId);
      });
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>All Product</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AdminContainer>
        <AdminHeading title='All Products' />
        <div className='flex flex-col '>
          <div className='overflow-x-auto'>
            <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='overflow-x-auto'>
                <table className='min-w-full'>
                  <thead className='border-b bg-gray-50'>
                    <tr>
                      {header.map((head) => (
                        <th
                          key={head}
                          scope='col'
                          className='text-xs font-semibold text-gray-700 px-6 py-4 text-left'
                        >
                          {head}
                        </th>
                      ))}
                      <th
                        scope='col'
                        className='text-xs font-semibold text-gray-700 px-6 py-4 text-left'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts?.map((product) => (
                      <tr className='border-b' key={product.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                          {product.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                          {product.category}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                          {product.name}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                          USD {product.price}
                        </td>
                        <td
                          title={product.imageId}
                          className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'
                        >
                          {product.imageId.slice(0, 16)}...
                        </td>
                        <td className='px-6 group realtive text-ellipsis overflow-hidden w-10 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                          {product.imageUrl.slice(0, 23)}...
                          <div className='absolute  hidden overflow-hidden rounded-md shadow-md group-hover:block'>
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width={120}
                              height={120}
                            />
                          </div>
                        </td>
                        <td className='px-6 text-ellipsis overflow-hidden w-10 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                          <div className='flex items-center gap-2'>
                            <button
                              onClick={() =>
                                router.push(
                                  `/admin/edit-product/${product.productId}`
                                )
                              }
                              disabled={isDeleting}
                              title='Edit'
                            >
                              <MdEditNote
                                className={
                                  isDeleting ? 'fill-zinc-400' : 'fill-zinc-700'
                                }
                                size={24}
                              />
                            </button>
                            <button
                              disabled={isDeleting}
                              onClick={() =>
                                handleDelete(product.productId, product.imageId)
                              }
                              title='Delete'
                            >
                              <MdDelete
                                className={
                                  isDeleting ? 'fill-zinc-400' : 'fill-zinc-700'
                                }
                                size={18}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AdminContainer>
    </>
  );
};
export default AllProducts;

AllProducts.PageLayout = MainLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await client.product.findMany();

  return {
    props: {
      products,
    },
  };
};
