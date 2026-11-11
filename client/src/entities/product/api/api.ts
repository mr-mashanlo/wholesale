import { kyInstance } from '@/shared/lib';

import { type PaginatedProduct, type Product } from '../model/schema';

class ProductService {

  getProducts = ( searchParams?: Record<string, string> ): Promise<PaginatedProduct> => {
    return kyInstance.get( 'products', { searchParams } ).json();
  };

  getProductSlug = ( slug: string ): Promise<Product> => {
    return kyInstance.get( `products/${slug}` ).json();
  };

}

export const productService = new ProductService();
