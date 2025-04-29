import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ channelId: string}>}) {
  const session = await auth();
  const userId = session?.user?.id;
  const { channelId } = await params;
  if (!userId) {
    return new Response('Authentication error', { status: 401 });
  }
  if (!channelId) {
    return new Response('Missing channel param', { status: 400 });
  }
  const readState = await prisma.channelReadState.findUnique({
    where: {
      channelId_userId: {
        userId: userId as string,
        channelId: channelId as string,
      },
    },
  });

  const unreadCount = await prisma.message.count({
    where: {
      channelId,
      createdAt: {
        gt: readState?.lastReadAt || new Date(0), // fallback to beginning of time
      },
    },
  });
  return NextResponse.json({ unreadCount })
}