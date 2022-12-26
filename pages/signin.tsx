import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainLayout from '../layouts/MainLayout';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { signinIcons, callbackOptions } from '../utils/menu';
import { BuiltInProviderType } from 'next-auth/providers';

const SignIn = ({ providers }: {providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> }) => {
  const { query: { callback } } = useRouter();

  return (
    <>
      <Head>
        <title>Sign-in</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='mt-12 bg-white flex flex-col gap-6 justify-center items-center'>
        <div className='rounded border p-6 space-y-3'>
          <h1 className='text-lg text-center'>Sign in to continue</h1>
          {Object.values(providers).map((provider: any) => (
            <div
              className={` ${
                signinIcons[provider.id as keyof typeof signinIcons]['bgColor']
              } 
            ${
              signinIcons[provider.id as keyof typeof signinIcons]['txtColor']
            } px-6 py-2 border rounded-md shadow hover:shadow-md transition-all`}
              key={provider.name}
            >
              <button
                className='flex items-center gap-4'
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl:
                      callbackOptions[
                        callback as keyof typeof callbackOptions
                      ] || '/sauces',
                  })
                }
              >
                {signinIcons[provider.id as keyof typeof signinIcons]['icon']}
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

SignIn.PageLayout = MainLayout;

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    
    return {
      redirect: {
        destination: '/sauces',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
};
