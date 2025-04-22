import { auth } from "@/auth";
import { prisma } from "@/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ channelId: string}> }) {
  const { channelId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return new Response('Not authorized', { status: 400 });
  }
  if (!channelId) {
    return new Response('Missing parameters', { status: 400 });
  }
  const messages = await prisma.message.findMany({
    where: { channelId },
    include: { sender: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(messages);
}


export const POST = async (req: NextRequest, { params }: { params: Promise<{ channelId: string}> }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { channelId } = await params;
  const { content } = await req.json();

  if (!channelId || !userId || !content) {
    return new Response('Missing parameters', { status: 400 });
  }
  // ensure the channel exists and user in the channel
  let channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
      members: { some: { userId: userId } },
    },
  });

  if (!channel) {
    return new Response('You are not authorized to send message in this channel', { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      channelId,
      senderId: userId,
      content,
    },
    include: {
      sender: true
    }
  });
  return NextResponse.json(message)
};
