import { Button } from '@headlessui/react';
import { type ButtonHTMLAttributes, type DetailedHTMLProps, type FC } from 'react';

import { type CartDTO, useCartStore } from '@/entities/cart';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  product: CartDTO
}

export const DecreaseCartButton: FC<Props> = ( { product, ...props } ) => {
  const decrease = useCartStore( state => state.decrease );

  return (
    <Button onClick={() => decrease( product )} {...props} />
  );
};

export default DecreaseCartButton;