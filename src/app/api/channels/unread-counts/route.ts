import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ channelId: string}>}) {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) {
    return new Response('Authentication error', { status: 401 });
  }
  // Get all channels the user is in
  const userChannels = await prisma.channel.findMany({
    where: {
      members: {
        some: { id: userId },
      },
    },
    select: {
      id: true,
      messages: {
        select: { createdAt: true },
      },
    },
  });

  const readStates = await prisma.channelReadState.findMany({
    where: { userId },
  });

  const readStateMap = Object.fromEntries(
    readStates.map((state) => [state.channelId, state.lastReadAt])
  );

  const unreadCounts = await Promise.all(
    userChannels.map(async (channel) => {
      const lastReadAt = readStateMap[channel.id] || new Date(0);
      const count = await prisma.message.count({
        where: {
          channelId: channel.id,
          createdAt: { gt: lastReadAt },
        },
      });
      return { channelId: channel.id, unreadCount: count };
    })
  );
  return NextResponse.json({ unreadCounts });
}