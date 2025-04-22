import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return new Response('Authentication error', { status: 401 });
  }
  // returns all channel user joined
  const channels = await prisma.channel.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    include: {
      product: true,
      members: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(channels);
}