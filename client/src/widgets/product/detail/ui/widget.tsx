import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useProduct } from '@/entities/product';
import { IncreaseCartButton } from '@/features/cart';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ProductDetail: FC<Props> = ( { className, ...props } ) => {
  const { slug } = useParams();
  const { product } = useProduct( slug || '' );

  return (
    <div className={twMerge( 'relative', className )} {...props}>
      <ul className="grid gap-4 sm:gap-10">
        <li className="flex items-center justify-center aspect-square bg-zinc-900/15">
          <img src="/default.svg" alt={product.data?.name} className="w-full" style={{ viewTransitionName: `img-${product.data?.id}` }} />
        </li>
        <li className="flex items-center justify-center aspect-square bg-zinc-900/15">
          <img src="/default.svg" alt={product.data?.name} className="w-full" />
        </li>
      </ul>
      <div className="typography mt-4 sm:mt-10">
        <h1>{product.data?.name}</h1>
        <p>1 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi doloremque expedita consequuntur in sit tempora mollitia! Eveniet omnis labore illo vel reiciendis impedit illum architecto, temporibus pariatur quidem.</p>
        {product.data?.dimensions &&
          <>
            <h2>Product params:</h2>
            <ul>
              <li>weight: {product.data?.dimensions.weight} mg</li>
              <li>size: {product.data?.dimensions.height} mm / {product.data?.dimensions.length} mm / {product.data?.dimensions.width} mm</li>
            </ul>
          </>
        }
        {product.data?.carton &&
          <>
            <h2>Carton params:</h2>
            <ul>
              <li>units: {product.data?.carton.units} pc</li>
              <li>weight: {product.data?.carton.dimensions.weight} mg</li>
              <li>size: {product.data?.carton.dimensions.height} mm / {product.data?.carton.dimensions.length} mm / {product.data?.carton.dimensions.width} mm</li>
            </ul>
          </>
        }
      </div>
      <div className="mt-10 sticky bottom-5">
        <IncreaseCartButton product={{ productId: product.data?.id || '', name: product.data?.name || '', price: 0 }}>Add to cart</IncreaseCartButton>
      </div>
    </div>
  );
};

export default ProductDetail;