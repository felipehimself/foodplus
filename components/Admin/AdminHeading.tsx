import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

interface IProps {
  title: string;
  width?:string;
}

const AdminHeading = ({ title, width }: IProps) => {
  return (
    <div className={`flex mb-4 relative justify-center items-center ${width || 'lg:w-4/12'} mx-auto`}>
      <Link href='/admin' className='absolute left-0'>
        <MdArrowBack className='fill-slate-600' size={22} />
      </Link>
      <h2 className=' font-semibold text-center text-slate-600'>{title}</h2>
    </div>
  );
};
export default AdminHeading;
