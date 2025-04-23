import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import { MessageWithSender } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      const { userId, name } = socket.handshake.query;
      console.log(`New client connected: ${userId} - ${name} : socket ID:`, socket.id);
      
      socket.on('joinRoom', (channelId, userName = 'User') => {
        socket.join(channelId);
        console.log(`${socket.id} joined room: ${channelId}`);
        io.to(channelId).emit('system', `${userName} ${socket.id} has joined.`);
      });

      socket.on("joinMultiple", ({ channelIds }: { channelIds: string[] }) => {
        channelIds.forEach((id) => socket.join(id));
      });
    
      socket.on("leaveMultiple", ({ channelIds }: { channelIds: string[] }) => {
        channelIds.forEach((id) => socket.leave(id));
      });
    

      socket.on('leaveRoom', (channelId, userName = 'User') => {
        socket.leave(channelId);
        console.log(`${socket.id} left room: ${channelId}`);
        io.to(channelId).emit('system', `${userName} ${socket.id} has left.`);
      });

      socket.on('sendMsg', (msg: MessageWithSender) => {
        console.log(`*********** Server got message: ${JSON.stringify(msg)}`);
        const channelId = msg.channelId;
        io.to(channelId).emit('receiveMsg', msg);
        console.log(`Message to ${channelId}: ${msg.content}`);
      });

      socket.on("typing", ({ channelId, user, userId }) => {
        io.to(channelId).emit("typing", { user, userId });
      });
    
      socket.on("stopTyping", ({ channelId, user, userId }) => {
        io.to(channelId).emit("stopTyping", { user, userId });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO server already running.");
  }

  res.end();
}
