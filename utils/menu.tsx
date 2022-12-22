import {
  FaCarrot,
  FaCheese,
  FaSeedling,
  FaWineBottle,
  FaAppleAlt,
} from 'react-icons/fa';

export const menuItems = [
  { item: 'sauces', icon: <FaWineBottle color='#fff' size={18} />, path: 'sauces' },
  { item: 'veggies', icon: <FaCarrot color='#fff' size={18} />, path: 'veggies' },
  { item: 'cheese', icon: <FaCheese color='#fff' size={15} />, path: 'cheese' },
  { item: 'crunch', icon: <FaSeedling color='#fff' size={18} />, path: 'crunch' },
  { item: 'extras', icon: <FaAppleAlt color='#fff' size={18} />, path: 'extras' },
];
