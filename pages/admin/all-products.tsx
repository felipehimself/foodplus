import { GetServerSideProps } from 'next';
import AdminContainer from '../../components/Admin/AdminContainer';
import AdminHeading from '../../components/Admin/AdminHeading';
import client from '../../lib/prismadb';
import { IProductFull } from '../../types/Product';
import { MdEditNote, MdDelete } from 'react-icons/md';
import Image from 'next/image';

const AllProducts = ({ products }: { products: IProductFull[] }) => {
  const header = [
    'Product Id',
    'Type',
    'Name',
    'Price',
    'Image ID',
    'Image URL',
  ];
  return (
    <AdminContainer>
      <AdminHeading width='w-11/12' title='All Products' />
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
                  {products.map((product) => (
                    <tr className='border-b' key={product.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                        {product.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900'>
                        {product.type}
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
                          <button title='Edit'>
                            <MdEditNote size={24} />
                          </button>
                          <button title='Delete'>
                            <MdDelete size={18} />
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
  );
};
export default AllProducts;

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await client.$queryRaw`
    SELECT 'sauce' AS type , Sauce.* FROM Sauce
    UNION
    SELECT 'veggie' AS type , Veggie.* FROM Veggie
    UNION
    SELECT 'cheese' AS type , Cheese.* FROM Cheese
    UNION
    SELECT 'crunch' AS type , Crunch.* FROM Crunch
    UNION
    SELECT 'extra' AS type , Extra.* FROM Extra
  `;

  return {
    props: {
      products,
    },
  };
};
