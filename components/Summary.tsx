import Image from 'next/image';
import Button from './Button';
import img from './..//public/image.jpeg';

const Summary = ({ showSummary }: { showSummary: boolean }) => {
  return (
    <div
      className={`text-sm fixed transition-all ${
        showSummary ? 'left-0' : '-left-full'
      } w-72 px-4 pb-4 h-screen bg-zinc-50 flex flex-col gap-3 md:static`}
    >

      
      <div>
        <Image
          width={136}
          height={136}
          src={img}
          alt='salad bowl'
          className='block mx-auto'
        />
        <h3 className='text-center font-semibold'>YOUR ORDER</h3>
      </div>
      <ul className='overflow-y-auto h-1/2'>
        {Array.from(Array(10).keys()).map((i) => {
          return <li key={i}>{i}</li>;
        })}
      </ul>
      <hr />
      <div className='flex flex-col  items-center gap-2 w-full'>
        <p className='text-center font-semibold'>TOTAL $6.90</p>
        <Button
          title='FINISH'
          className='w-full bg-orange-500 hover:bg-orange-600 text-white'
        />
      </div>
      <div>
        <Button title='CANCEL' className='w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white' />
      </div>
    </div>
  );
};
export default Summary;
