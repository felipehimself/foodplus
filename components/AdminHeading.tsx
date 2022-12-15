import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

interface IProps {
  title: string;
  width?: string;
}

const AdminHeading = ({ title, width }: IProps) => {
  return (
    <div
      className={`flex mb-4 relative justify-center items-center ${
        width || 'lg:w-4/12'
      } mx-auto`}
    >
      <h2>{title}</h2>
    </div>
  );
};
export default AdminHeading;
