import Image from 'next/image';
import { IProductFull } from '../types/Product';

const ProductCard = ({ id, price, imageUrl, name }: IProductFull) => {
  return (
    <button
      className='relative flex items-center justify-between w-52 h-40 bg-white rounded-md'
      key={id}
    >
      <span className='text-xs flex items-center justify-center rounded-full bg-neutral-700 text-white w-12 h-12 absolute -top-5 right-3'>
        $ {price}
      </span>
      <div>
        <Image src={imageUrl} alt={name} width={100} height={100} />
      </div>
      <p className='flex-1 text-lg text-slate-700'>{name}</p>
    </button>
  );
};
export default ProductCard;
