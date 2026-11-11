import { type FC } from 'react';
import { Link } from 'react-router';

import { ProductList } from '@/widgets/product/list';

export const HomePage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <title>Grocery - Online Grocery Shopping</title>
      <meta property="og:title" content="Grocery - Online Grocery Shopping" />
      <meta name="description" content="Order fresh groceries online with fast delivery and great prices" />
      <meta property="og:description" content="Order fresh groceries online with fast delivery and great prices" />
      <meta property="og:image" content="/meta.svg" />
      <meta property="og:site_name" content="Grocery" />
      <meta property="twitter:card" content="summary" />

      <header className="p-4 sm:px-50 sm:py-10 flex justify-between gap-4">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
      </header>

      <main>
        <section className="p-4 sm:p-20">
          <div className="sm:w-225 mx-auto">
            <ProductList />
          </div>
        </section>
      </main>

      <footer className="mt-auto p-4 sm:px-50 sm:py-10 flex justify-center gap-4">
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem distinctio cum</div>
      </footer>
    </div>
  );
};

export default HomePage;