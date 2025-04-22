import type { Message } from "@prisma/client";

export type MessageWithSender = Message & { sender: { id: string, name: string, image: string } }
