import { GetServerSideProps } from 'next';
import ProductCard from '../../components/ProductCard';
import ProductContainer from '../../components/ProductContainer';
import client from '../../lib/prismadb';
import { IProduct } from '../../types/Product';
import { CartLayout } from '../../layouts/CartLayout';

const Extras = ({ extras }: { extras: IProduct[] }) => {
  return (
    <ProductContainer>
      {extras.map((extra) => (
        <ProductCard key={extra.id} {...extra} />
      ))}
    </ProductContainer>
  );
};

Extras.PageLayout = CartLayout;

export default Extras;

export const getServerSideProps: GetServerSideProps = async () => {
  const extras = await client.product.findMany({
    where: {
      category: 'extra',
    },
  });

  return {
    props: {
      extras,
    },
  };
};
