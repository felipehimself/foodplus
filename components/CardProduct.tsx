import Image from 'next/image';
import { IProduct } from '../interfaces/Product';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../features/cartSlice';
import toast from 'react-hot-toast';

const CardProduct = ({
  id,
  price,
  imageUrl,
  name,
  productId,
  category,
}: IProduct) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (
    price: number,
    name: string,
    productId: string,
    category: string,
    imageUrl: string
  ) => {
    dispatch(addToCart({ price, name, productId, category, imageUrl }));
    toast.success('Added to cart!');
  };

  return (
    <>
      <button
        onClick={() =>
          handleAddToCart(price, name, productId, category, imageUrl)
        }
        className='p-4 rounded-md bg-white shadow-md hover:shadow-lg transition-all relative flex items-center justify-between w-52 h-40'
        key={id}
      >
        <span className='text-2xs rounded-sm hidden md:flex items-center justify-center  bg-accent-400 text-white w-11 h-6 absolute -top-3 -right-2 shadow-md'>
          $ {price.toFixed(2)}
        </span>
        <div>
          <Image src={imageUrl} alt={name} width={100} height={100} />
        </div>
        <div>
          <p className='flex-1 text-lg text-slate-700'>{name}</p>
          <p className='md:hidden text-accent-400 text-sm font-semibold'>$ {price.toFixed(2)}</p>
        </div>
      </button>
    </>
  );
};
export default CardProduct;
