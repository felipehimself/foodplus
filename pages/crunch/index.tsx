import Head from 'next/head';
import { CartLayout } from '../../layouts/CartLayout';

const Crunch = () => {
  return (
    <>
      <Head>
        <title>Crunch</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div>Crunch</div>
    </>
  );
};

Crunch.PageLayout = CartLayout;

export default Crunch;
