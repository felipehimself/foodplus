import Link from 'next/link';
import { useRouter } from 'next/router';
import { menuItems } from '../utils/menu';

const MobileTab = () => {
  const router = useRouter();

  const { pathname } = router;

  const callback = pathname.substring(1);

  return (
    <nav className='bg-primary-500 fixed left-0 right-0 z-40 bottom-0 w-full flex items-center md:hidden '>
      <ul className='w-full flex justify-evenly text-white'>
        {menuItems.map((item, index) => (
          <li className='relative pt-4 pb-1' key={item.path}>
            <Link
              className='flex flex-col justify-center items-center capitalize gap-2'
              href={`/${item.path}`}
            >
              {menuItems[index]?.icon}
              <span className='text-xs'>{item?.item}</span>
            </Link>
            <span
              className={`
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          border-solid border-t-zinc-50 border-t-[0.5rem] border-x-transparent border-x-[0.5rem] border-b-0
          transition-all
          ${router.pathname.includes(item.path) ? 'opacity-100' : 'opacity-0'}
          `}
            ></span>{' '}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default MobileTab;
