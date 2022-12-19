import Head from 'next/head';
import { CartLayout } from '../../layouts/CartLayout';

const Cheese = () => {
  return (
    <>
      <Head>
        <title>Cheese</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div>Cheese</div>
    </>
  );
};

Cheese.PageLayout = CartLayout;

export default Cheese;
