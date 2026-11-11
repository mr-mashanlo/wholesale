import { type FC } from 'react';

import { SignInForm } from '@/features/auth';

export const SignInPage: FC = () => {
  return (
    <>
      <title>Sign in | Grocery</title>
      <meta property="og:title" content="Sign in | Grocery" />
      <meta name="description" content="Sign in to your Grocery account to manage orders and profile" />
      <meta property="og:description" content="Sign in to your Grocery account to manage orders and profile" />
      <meta property="og:image" content="/meta.svg" />
      <meta property="og:site_name" content="Grocery" />
      <meta property="twitter:card" content="summary" />

      <main className="min-h-screen">
        <section className="h-screen p-4 sm:p-8 flex justify-center items-center">
          <SignInForm />
        </section>
      </main>
    </>
  );
};

export default SignInPage;