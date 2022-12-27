import { GetServerSideProps } from 'next';
import { IProduct } from '../../interfaces/Product';
import CardProduct from '../../components/CardProduct';
import client from '../../lib/prismadb';
import  CartLayout  from '../../layouts/CartLayout';
import Head from 'next/head';

const Veggie = ({ veggies }: { veggies: IProduct[] }) => {
  return (
    <>
      <Head>
        <title>Veggie</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      {veggies.map((veggie) => (
        <CardProduct key={veggie.id} {...veggie} />
      ))}
    </>
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
