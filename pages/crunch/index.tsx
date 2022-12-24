import { GetServerSideProps } from 'next';
import Head from 'next/head';
import CardProduct from '../../components/CardProduct';
import { IProduct } from '../../interfaces/Product';
import { CartLayout } from '../../layouts/CartLayout';
import client from '../../lib/prismadb';

const Crunch = ({ crunch }: { crunch: IProduct[] }) => {
  return (
    <>
      <Head>
        <title>Crunch</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {crunch.map((item) => (
        <CardProduct key={item.id} {...item} />
      ))}
    </>
  );
};

Crunch.PageLayout = CartLayout;

export default Crunch;

export const getServerSideProps: GetServerSideProps = async () => {
  const crunch = await client.product.findMany({
    where: {
      category: 'crunch',
    },
  });

  return {
    props: {
      crunch,
    },
  };
};
