import { fetchTopProducts } from "@/db/queries/product";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Home'
}

export default async function Home() {
  const products = await fetchTopProducts();
  return (<div className="container mx-auto py-20">
    {products.map((product, idx) => {
      return (
        <div key={idx}>
          <Link href={`/${product.id}/${product.slug}`} className="text-2xl font-semibold">{ product.title }</Link>
        </div>
      )
    })}
  </div>)
}
