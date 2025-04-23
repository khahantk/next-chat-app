import type { Channel, ChannelMember, Message, Product, User } from "@prisma/client";

export type MessageWithSender = Message & { sender: { id: string, name: string, image: string } }

export type ChannelMemberWithUser = ChannelMember & { user: User }
export type ChannelWithData = Channel & { members: ChannelMemberWithUser[] } & { product: Product}