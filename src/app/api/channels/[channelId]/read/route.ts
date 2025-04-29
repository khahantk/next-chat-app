import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
  const session = await auth();
  const userId = session?.user?.id;
  const { channelId } = await params;
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (!channelId) {
    return new Response('Missing param', { status: 400 });
  }

  await prisma.channelReadState.upsert({
    where: {
      channelId_userId: {
        userId: userId,
        channelId,
      },
    },
    update: { lastReadAt: new Date() },
    create: {
      userId: userId,
      channelId,
      lastReadAt: new Date(),
    },
  });
  return NextResponse.json({ })
}