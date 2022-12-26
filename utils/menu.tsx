import { BsGithub } from 'react-icons/bs';
import {
  FaCarrot,
  FaCheese,
  FaSeedling,
  FaWineBottle,
  FaAppleAlt,
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export const menuItems = [
  {
    item: 'sauces',
    icon: <FaWineBottle color='#fff' size={18} />,
    path: 'sauces',
  },
  {
    item: 'veggies',
    icon: <FaCarrot color='#fff' size={18} />,
    path: 'veggies',
  },
  { item: 'cheese', icon: <FaCheese color='#fff' size={15} />, path: 'cheese' },
  {
    item: 'crunch',
    icon: <FaSeedling color='#fff' size={18} />,
    path: 'crunch',
  },
  {
    item: 'extras',
    icon: <FaAppleAlt color='#fff' size={18} />,
    path: 'extras',
  },
];

export const signinIcons = {
  google: {
    icon: <FcGoogle size={20} />,
    bgColor: 'bg-white',
    txtColor: 'text-neutral-600',
  },
  github: {
    icon: <BsGithub size={20} />,
    bgColor: 'bg-black',
    txtColor: 'text-white',
  },
};

export const callbackOptions = {
  sauces: '/sauces',
  veggies: '/veggies',
  cheese: '/cheese',
  crunch: '/crunch',
  extras: '/extras',
  checkout: '/checkout',
};
