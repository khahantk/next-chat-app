import type { Product } from '@prisma/client';
import ProductChat from './product-chat';

type ProductDetailProps = {
  product: Product;
};
const ProductDetail = async ({ product }: ProductDetailProps) => {
  return (
    <div className="container mx-auto py-20">
      <div className="">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div>{product.description}</div>
        <div className="py-10">
          <ProductChat product={product} />
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetail;
