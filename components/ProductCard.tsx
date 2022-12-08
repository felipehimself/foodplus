import Image from 'next/image';
import { IProduct } from '../types/Product';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

const ProductCard = ({ id, price, imageUrl, name, productId, category }: IProduct) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string, price: number, name: string, productId:string, category:string) => {
    dispatch(addToCart({ id, price, name, productId, category }));
    toast.success('Added to cart!');
  };

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <button
        onClick={() => handleAddToCart(id, price, name, productId, category)}
        className='shadow-md hover:shadow-lg transition-all relative flex items-center justify-between w-52 h-40 bg-white rounded-md'
        key={id}
      >
        <span className='text-[10px] flex items-center justify-center rounded-full bg-neutral-700 text-white w-9 h-9 absolute -top-5 right-2'>
          $ {price}
        </span>
        <div>
          <Image src={imageUrl} alt={name} width={100} height={100} />
        </div>
        <p className='flex-1 text-lg text-slate-700'>{name}</p>
      </button>
    </>
  );
};
export default ProductCard;
