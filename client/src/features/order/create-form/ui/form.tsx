import { AtSign } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Cart } from '@/entities/cart';
import { OrderDTOSchema } from '@/entities/order';
import { Button } from '@/shared/ui/button';
import { TextInput } from '@/shared/ui/form';
import { Table } from '@/shared/ui/table';

import { useCreateOrderForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
interface ExtendedItems extends Cart { action?: string };

export const CreateOrderForm: FC<Props> = ( { className, ...props } ) => {
  const form = useCreateOrderForm();

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full relative', className )} {...props}>
      <div className="grid gap-4 sm:gap-10">
        <div className="grid gap-4 sm:gap-5">
          <form.Field name="address">
            {() => <>
              <form.Field name="address.state" validators={{ onChange: OrderDTOSchema.shape.address.shape.state }}>
                {field => <TextInput icon={AtSign} type="text" placeholder="Jambyl" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
              </form.Field>
              <form.Field name="address.city" validators={{ onChange: OrderDTOSchema.shape.address.shape.city }}>
                {field => <TextInput icon={AtSign} type="text" placeholder="Taraz" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
              </form.Field>
              <form.Field name="address.address" validators={{ onChange: OrderDTOSchema.shape.address.shape.address }}>
                {field => <TextInput icon={AtSign} type="text" placeholder="Dank, 31" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
              </form.Field>
            </>}
          </form.Field>
          <form.Subscribe>
            {state => <Button type="submit" disabled={!state.canSubmit}>{state.isSubmitting ? '•••' : 'Save'}</Button>}
          </form.Subscribe>
        </div>
        <div>
          <Table<ExtendedItems>
            data={{ data: form.state.values.items, limit: 10, page: 1, total: 100 }}
            columns={[ { key: 'action', value: 'Action' }, { key: 'name', value: 'Name' }, { key: 'amount', value: 'Amount', cell: row => <TextInput icon={AtSign} scale="small" value={row.action} /> } ]}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateOrderForm;