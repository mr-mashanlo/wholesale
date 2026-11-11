import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { Link, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useProducts } from '@/entities/product';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

export const ProductList: FC<Props> = ( { className, ...props } ) => {
  const [ searchParams ] = useSearchParams();
  const { products } = useProducts( { limit: '10', archived: 'false', ...Object.fromEntries( searchParams.entries() ) } );

  return (
    <ul className={twMerge( 'grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-10', className )} {...props}>
      {products.data?.data.map( product =>
        <li key={product.id} className="flex items-center justify-center aspect-square bg-zinc-900/15">
          <Link to={`/products/${product.slug}`} viewTransition>
            <img src="/default.svg" alt={product.name} className="w-full transition-transform hover:scale-105 active:scale-95" style={{ viewTransitionName: `img-${product.id}` }} />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default ProductList;