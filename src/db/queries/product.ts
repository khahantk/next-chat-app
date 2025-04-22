import { prisma } from '@/db'
import { Product } from "@prisma/client"

export async function fetchProductsBySearchTerm() {
  
}

export async function fetchProductById(id: string) {
  return prisma.product.findFirst({
    where: {
      id: id
    }
  })
}
export async function fetchProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: {
      slug: slug
    }
  })
}
export async function fetchTopProducts() {
  return prisma.product.findMany({
    take: 10
  })
}
export async function fetchFeaturedProducts() {
  return prisma.product.findMany({
    take: 10
  })
}

export async function fetchProductsByUserId() {
  
}
