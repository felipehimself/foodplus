import { GetServerSideProps } from 'next';
import CardProduct from '../../components/CardProduct';
import client from '../../lib/prismadb';
import { IProduct } from '../../interfaces/Product';
import  CartLayout  from '../../layouts/CartLayout';
import Head from 'next/head';

const Extras = ({ extras }: { extras: IProduct[] }) => {
  return (
    <>
      <Head>
        <title>Extras</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      {extras.map((extra) => (
        <CardProduct key={extra.id} {...extra} />
      ))}
    </>
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
