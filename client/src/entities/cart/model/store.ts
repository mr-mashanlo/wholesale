import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type Cart, type CartDTO } from './schema';

interface Store {
  products: Array<Cart>,
  increase: ( product: CartDTO ) => void,
  decrease: ( product: CartDTO ) => void,
  reset: () => void
}

export const useCartStore = create( persist<Store>( ( set, get ) => ( {

  products: [],

  increase: ( product ) => {
    const products = get().products;
    const exists = products.find( item => item.productId === product.productId );

    if ( exists ) {
      return set( { products: products.map( item => item.productId === product.productId ? { ...item, amount: item.amount + 1 } : item ) } );
    } else {
      return set( { products: [ ...products, { ...product, amount: 1 } ] } );
    }
  },

  decrease: ( product ) => {
    const products = get().products;
    const exists = products.find( item => item.productId === product.productId );

    if ( exists && exists.amount > 1 ) {
      return set( { products: products.map( item => item.productId === product.productId ? { ...item, amount: item.amount - 1 } : item ) } );
    } else {
      return set( { products: products.filter( item => item.productId !== product.productId ) } );
    }
  },

  reset: () => {
    return set( { products: [] } );
  }

} ), { name: 'cart' } ) );