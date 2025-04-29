import ProductDetail from '@/components/shared/product/product-detail';
import { fetchProductById } from '@/db/queries/product';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async (props: ProductDetailPageProps) => {
  const { id } = await props.params;
  const product = await fetchProductById(id);
  if (!product) {
    return notFound();
  }
  return (
    <>
      <head>
        <title>{product.title}</title>
      </head>
      <ProductDetail product={product} />
    </>
  );
};

export default ProductDetailPage;
