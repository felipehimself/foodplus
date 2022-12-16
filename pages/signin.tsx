import { getProviders, signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';

const icons = {
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

const callbackOptions = {
  sauces:'/sauces',
  veggies:'/veggies',
  cheese:'/cheese',
  crunch:'/crunch',
  extras:'/extras'
}

const SignIn = ({ providers }: any) => {
  const { data: session, status  } = useSession();

  const { query: { callback } } = useRouter();

  const router = useRouter();

  useEffect(() => {
    if ((status !== 'loading') && session) {
      router.back();
    }
  }, [session, router, status]);

  return (
    <div className='mt-4 bg-white flex flex-col gap-6 justify-center items-center'>
      <div className='rounded border p-6 space-y-3'>
        <h1 className='text-lg text-center'>Sign in to continue</h1>
        {Object.values(providers).map((provider: any) => (
          <div
            className={` ${icons[provider.id as keyof typeof icons]['bgColor']} 
            ${
              icons[provider.id as keyof typeof icons]['txtColor']
            } px-6 py-2 border rounded-md shadow hover:shadow-md transition-all`}
            key={provider.name}
          >
            <button
              className='flex items-center gap-4'
              onClick={() => signIn(provider.id, {callbackUrl:callbackOptions[callback as keyof typeof callbackOptions] || '/sauces'})}
              disabled={status == 'loading'}
            >
              {icons[provider.id as keyof typeof icons]['icon']}
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

SignIn.PageLayout = MainLayout

export default SignIn
export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
