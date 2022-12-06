import { GetServerSideProps } from 'next';
import { IProduct } from '../../types/Product';
import ProductCard from '../../components/ProductCard';
import ProductContainer from '../../components/ProductContainer';
import client from '../../lib/prismadb';

const Veggie = ({ veggies }: { veggies: IProduct[] }) => {
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
  const veggies = await client.product.findMany({
    where: {
      category: 'veggie',
    },
  });

  return {
    props: {
      veggies,
    },
  };
};
