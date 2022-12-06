import { GetServerSideProps } from 'next';
import { IProductFull } from '../../types/Product';
import ProductCard from '../../components/ProductCard';
import client from '../../lib/prismadb';

const Veggie = ({ veggies }: { veggies: IProductFull[] }) => {
  return (
    <section className='mt-10'>
      <h1 className='mb-10'>Customize</h1>
      <div className='flex flex-wrap  items-center gap-5  lg:flex-row'>
        {veggies.map((veggie) => (
          <ProductCard key={veggie.id} {...veggie} />
        ))}
      </div>
    </section>
  );
};
export default Veggie;

export const getServerSideProps: GetServerSideProps = async () => {
  const veggies = await client.veggie.findMany();

  return {
    props: {
      veggies,
    },
  };
};
