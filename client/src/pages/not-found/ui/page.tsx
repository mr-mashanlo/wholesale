import { type FC } from 'react';
import { Link } from 'react-router';

export const NotFoundPage: FC = () => {
  return (
    <>
      <title>Page not found | Grocery</title>
      <meta property="og:title" content="Page not found | Grocery" />
      <meta name="description" content="The page you are looking for doesn't exist or has been moved" />
      <meta property="og:description" content="The page you are looking for doesn't exist or has been moved" />
      <meta property="og:image" content="/meta.svg" />
      <meta property="og:site_name" content="Grocery" />
      <meta property="twitter:card" content="summary" />

      <main className="min-h-screen">
        <section className="h-screen p-4 sm:p-8 flex justify-center items-center text-center">
          <div>
            <h1 className="text-xl font-bold">Page 404</h1>
            <p className="mt-5">The resource requested could not be found on this server. <Link to="/" className="font-bold decoration-[.1rem] hover:underline">Go to home page</Link></p>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFoundPage;