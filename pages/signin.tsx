import { getProviders, signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { useRouter } from 'next/router';


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

export default function SignIn({ providers }: any) {
  const { data: session } = useSession()

  const router = useRouter();

  if(session)  router.push('/sauces')

  return (
    <div className='h-screen -mt-8 w-screen flex flex-col gap-6 justify-center items-center'>
      <div className='shadow bg-white rounded-lg p-6 space-y-3'>
      <h1 className='text-lg text-center'>Sign in to continue</h1>
        {Object.values(providers).map((provider: any) => (
          <div
            className={` ${
              icons[provider.id as keyof typeof icons]['bgColor']
            } 
            ${
              icons[provider.id as keyof typeof icons]['txtColor']
            } px-6 py-2 border rounded-md shadow hover:shadow-md transition-all`}
            key={provider.name}
          >
            <button
              className='flex items-center gap-4'
              onClick={() => signIn(provider.id)}
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

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
