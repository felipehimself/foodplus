import Image from 'next/image';
import { IItems, IOrder } from './../types/Order';

const CardOrder = ({ imageUrl, name, price, quantity }: IOrder | IItems) => {
  return (
    <div className='flex gap-2 items-end'>
      <div className='-mb-2'>
        <Image src={imageUrl} width={60} height={60} alt={name} />
      </div>
      <div className='flex text-sm  items-end'>
        <div>
          <p>{name}</p>
          <p>$ {price.toFixed(2)}</p>
        </div>
      </div>
      <span className='text-sm flex-1 text-right'>x {quantity}</span>
    </div>
  );
};
export default CardOrder;
