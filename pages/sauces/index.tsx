import { GetServerSideProps } from 'next';
import Head from 'next/head';
import CardProduct from '../../components/CardProduct';
import { IProduct } from '../../interfaces/Product';
import { CartLayout } from '../../layouts/CartLayout';
import client from '../../lib/prismadb';

const Sauces = ({ sauces }: { sauces: IProduct[] }) => {
  return (
    <>
      <Head>
        <title>Sauces</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      {sauces.map((sauce) => (
        <CardProduct key={sauce.id} {...sauce} />
      ))}
    </>
  );
};

Sauces.PageLayout = CartLayout;

export default Sauces;

export const getServerSideProps: GetServerSideProps = async () => {
  const sauces = await client.product.findMany({
    where: {
      category: 'sauces',
    },
  });

  return {
    props: {
      sauces,
    },
  };
};