import { type ButtonHTMLAttributes, type DetailedHTMLProps, type FC } from 'react';

import { type CartDTO, useCartStore } from '@/entities/cart';
import { Button } from '@/shared/ui/button';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  product: CartDTO
}

export const IncreaseCartButton: FC<Props> = ( { product, ...props } ) => {
  const increase = useCartStore( state => state.increase );

  return (
    <Button onClick={() => increase( product )} {...props} />
  );
};

export default IncreaseCartButton;