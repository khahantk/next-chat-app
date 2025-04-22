'use client';

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductImagesProps = {
 images: string[]
}
const ProductImages = ({ images }: ProductImagesProps) => {
  const [current, setCurrent] = useState(0);

  return ( 
    <div className="space-y-4">
      <Image src={images[current]} alt="" width={1000} height={1000} className="min-h-[300px object-cover object-center" />
      <div className="flex">
        {
          images.map((image, idx) => {
            return (
              <div key={image} onClick={()=> setCurrent(idx)} className={cn('border mr-2 cursor-pointer hover:border-orange-600', current=== idx && 'border-orange-500')}>
                <Image src={images[idx]} alt="" width={100} height={100}/> 
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default ProductImages