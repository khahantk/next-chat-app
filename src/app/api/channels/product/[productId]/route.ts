import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ productId: string}>}) {
  const session = await auth();
  const userId = session?.user?.id;
  const { productId } = await params;
  let channel;
  if (!userId) {
    return new Response('Authentication error', { status: 401 });
  }
  if (productId) {
    // in product detail page
    const product = await prisma.product.findFirst({
      where: {
        id: productId
      }
    })
    if (!product) {
      return new Response('Missing product', { status: 400 });
    }
    // Fetch the existing channel or create a new one if none exists
    channel = await prisma.channel.findFirst({
      where: {
        productId,
        members: { some: { userId: userId } },
      },
    });

    if (!channel && product) {
      const buyerId = userId;
      const sellerId = product.sellerId;
      if (buyerId === sellerId) {
        return new Response('Bad request', { status: 400 });
      }
      // Create a new channel if none exists
      channel = await prisma.channel.create({
        data: {
          isGroup: false,
          name: product.title,
          productId,
          members: {
            create: [
              { userId: buyerId }, // buyer ID
              { userId: sellerId }, // seller ID
            ]
          }
        },
      });

    }
  }
  if (channel) {
    return NextResponse.json(channel)
  }
}