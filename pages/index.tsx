import HomeLayout from '../layouts/HomeLayout';
import welcome from './../public/welcome-home-webp.webp';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='mx-auto pt-5 md:h-screen md:pt-0 flex flex-col gap-5 justify-center items-center'>
      <h2 className='text-2xl'>Welcome to FoodPlus</h2>
      <div>
        <Image src={welcome} width={400} height={400} alt='Welcome image' />
      </div>
      <p className='text-xl text-center'>
        Start adding items to your cart <br /> by navigating through the menu{' '}
        <span className='hidden md:inline'>on the left</span>
        <span className='md:hidden'>below</span>
      </p>
    </div>
  );
};

Home.PageLayout = HomeLayout;

export default Home;
