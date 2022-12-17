import Image from 'next/image';
import { IProduct } from '../types/Product';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

const ProductCard = ({ id, price, imageUrl, name, productId, category }: IProduct) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = ( price: number, name: string, productId:string, category:string, imageUrl:string) => {
    dispatch(addToCart({ price, name, productId, category, imageUrl }));
    toast.success('Added to cart!');
  };

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <button
        onClick={() => handleAddToCart(price, name, productId, category, imageUrl)}
        className='p-2 rounded-md bg-white shadow-md hover:shadow-lg transition-all relative flex items-center justify-between w-52 h-40'
        key={id}
      >
        <span className='text-[10px] rounded-sm flex items-center justify-center  bg-accent-400 text-white w-10 h-6 absolute -top-3 -right-2 shadow-md'>
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
