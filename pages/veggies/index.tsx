import { GetServerSideProps } from 'next';
import { IProduct } from '../../types/Product';
import CardProduct from '../../components/CardProduct';
import ProductContainer from '../../components/ProductContainer';
import client from '../../lib/prismadb';
import { CartLayout } from '../../layouts/CartLayout';

const Veggie = ({ veggies }: { veggies: IProduct[] }) => {
  return (
    <ProductContainer>
      {veggies.map((veggie) => (
        <CardProduct key={veggie.id} {...veggie} />
      ))}
    </ProductContainer>
  );
};

Veggie.PageLayout = CartLayout;

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
