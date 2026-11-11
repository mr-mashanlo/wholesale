import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';
import { useNavigate } from 'react-router';

import { useCartStore } from '@/entities/cart';
import { type OrderDTO, useCreateOrder } from '@/entities/order';
import { mapServerErrors } from '@/shared/mapper';

export const useCreateOrderForm = () => {
  const navigate = useNavigate();
  const { products, reset } = useCartStore();
  const { create } = useCreateOrder();

  const form = useForm( {
    defaultValues: {
      items: products,
      address: {
        state: '',
        city: '',
        address: ''
      }
    } as OrderDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( value );
        form.reset();
        reset();
        navigate( '/orders', { replace: true } );
      } catch ( error ) {
        if ( error instanceof HTTPError ) {
          const errors = await error.response.json();
          formApi.setErrorMap( { onChange: { fields: mapServerErrors( errors.errors ) } } );
        }
      }
    }
  } );

  return form;
};