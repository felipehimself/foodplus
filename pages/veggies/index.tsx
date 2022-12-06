import { GetServerSideProps } from 'next';
import { IProductFull } from '../../types/Product';
import ProductCard from '../../components/ProductCard';
import ProductContainer from '../../components/ProductContainer';
import client from '../../lib/prismadb';

const Veggie = ({ veggies }: { veggies: IProductFull[] }) => {
  return (
    <ProductContainer>
      {veggies.map((veggie) => (
        <ProductCard key={veggie.id} {...veggie} />
      ))}
    </ProductContainer>
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
