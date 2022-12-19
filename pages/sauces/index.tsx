import Head from 'next/head';
import { CartLayout } from '../../layouts/CartLayout';

const Sauces = () => {
  return (
    <>
      <Head>
        <title>Sauces</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      {Array.from(Array(1000).keys()).map((i) => {
        return <div key={i}>{i}</div>;
      })}
    </>
  );
};

Sauces.PageLayout = CartLayout;

export default Sauces;
