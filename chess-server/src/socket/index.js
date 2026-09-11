import { Server } from "socket.io";
import { socketAuth } from "./socketAuth.js";
import { onlineUsers } from "./onlineUsers.js";

function logOnlineUsers() {
  const rows = [...onlineUsers.entries()].map(([userId, socketIds]) => ({
    userId,
    socketCount: socketIds.length,
    socketIds: socketIds.join(", "),
  }));

  console.table(rows);
}

//server only for real time requests
export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);
    const currentSocketId = socket.id;
    const userId = socket.user._id.toString();

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, []);
    }
    onlineUsers.get(userId).push(currentSocketId);
    logOnlineUsers();

    socket.on("inviteFriend", async (friendId) => {
      console.log("sent to: ", friendId);
      console.log("sent by: ", socket.user.username);
      
    });

    socket.on("disconnect", (reason) => {
      const sockets = onlineUsers.get(userId) ?? [];
      const filtered = sockets.filter((id) => id !== currentSocketId);

      if (filtered.length === 0) onlineUsers.delete(userId);
      else onlineUsers.set(userId, filtered);
      console.log("Disconnected", currentSocketId, "reason: ", reason);
      logOnlineUsers();
    });
  });

  return io;
}
