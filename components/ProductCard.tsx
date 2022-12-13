import Image from 'next/image';
import { IProduct } from '../types/Product';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

const ProductCard = ({ id, price, imageUrl, name, productId, category }: IProduct) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string, price: number, name: string, productId:string, category:string, imageUrl:string) => {
    dispatch(addToCart({ id, price, name, productId, category, imageUrl }));
    toast.success('Added to cart!');
  };

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <button
        onClick={() => handleAddToCart(id, price, name, productId, category, imageUrl)}
        className=' shadow hover:shadow-md rounded transition-all relative flex items-center justify-between w-52 h-40 bg-white '
        key={id}
      >
        <span className='text-[10px] flex items-center justify-center  bg-neutral-600 text-white w-10 h-6 absolute -top-3 -right-2 shadow-md'>
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
