import {
  FaCarrot,
  FaCheese,
  FaSeedling,
  FaWineBottle,
  FaAppleAlt,
} from 'react-icons/fa';

export const menuItems = [
  { item: 'sauces', icon: <FaWineBottle size={18} />, path: 'sauces' },
  { item: 'veggies', icon: <FaCarrot size={18} />, path: 'veggies' },
  { item: 'cheese', icon: <FaCheese size={15} />, path: 'cheese' },
  { item: 'crunch', icon: <FaSeedling size={18} />, path: 'crunch' },
  { item: 'extras', icon: <FaAppleAlt size={18} />, path: 'extras' },
];
