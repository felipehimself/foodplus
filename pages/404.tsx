import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import errorImg from './../public/404-img.jpg';

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Navbar />
      <div className='flex flex-col space-y-2 justify-center items-center mt-20'>
        <h3>This page does not exist</h3>
        <Image
          title='Image by storyset on Freepik'
          src={errorImg}
          width={450}
          height={450}
          alt='Image showing a 404 error'
        />
        <Link
          href='/sauces'
          className='bg-primary-500 text-white rounded-md py-2 px-4 hover:bg-primary-600 transition-all'
        >
          Go Home
        </Link>
      </div>
    </>
  );
};
export default ErrorPage;
