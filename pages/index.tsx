import HomeLayout from '../layouts/HomeLayout';
import welcome from './../public/welcome-home-webp.webp';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='absolute w-10/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className="flex flex-col items-center justify-center gap-4 md:ml-[5rem]">
        <h2 className='text-2xl md:text-3xl text-center'>Welcome to FoodPlus</h2>
        <div>
          <Image src={welcome} width={400} height={400} alt='Welcome image' />
        </div>
        <p className='text-lg md:text-xl text-center'>
          Start adding items to your cart <br /> by navigating through the menu{' '}
          <span className='hidden md:inline'>on the left</span>
          <span className='md:hidden'>below</span>
        </p>
      </div>
    </div>
  );
};

Home.PageLayout = HomeLayout;

export default Home;
