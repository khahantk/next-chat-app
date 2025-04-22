import ProductDetail from "@/components/shared/product/product-detail"
import { fetchProductById } from "@/db/queries/product"
import { notFound } from "next/navigation"

type ProductDetailPageProps = {
  params: Promise<{ id: string}>
}

const ProductDetailPage = async (props: ProductDetailPageProps) => {
  const { id } = await props.params
  const product = await fetchProductById(id);
  if (!product) {
    return notFound();
  }
  return (<ProductDetail product={product}/>);
}
 
export default ProductDetailPage;