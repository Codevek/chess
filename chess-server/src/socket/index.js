import { Server } from "socket.io";
import { socketAuth } from "./socketAuth.js";
import { onlineUsers } from "./onlineUsers.js";

//server only for real time requests
export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", async (socket) => {
    console.log("Connected:", socket.id);
    const currentSocketId = socket.id;
    const userId = await socket.user._id.toString();

    console.log(userId);

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, []);
    }

    onlineUsers.get(userId).push(currentSocketId);

    console.table(onlineUsers);

    // socket.on("hello", (name) => {
    //   console.log("Client says:", name);
    // });

    socket.on("disconnect", (reaason) => {
      const sockets = onlineUsers.get(userId);
      const filtered = sockets.filter((id) => id !== currentSocketId);

      if (filtered.length === 0) onlineUsers.delete(userId);
      else onlineUsers.set(userId, filtered);
      console.log("Disconnected", currentSocketId, "reason: ", reaason);
    });
  });
  return io;
}
