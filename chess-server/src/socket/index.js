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
    socket.emit("friendsOnline", )

    socket.on("inviteFriend", async (friendId) => {
      try {
        const receiverSockets = onlineUsers.get(friendId);
        if(!receiverSockets){
          socket.emit("friendOffline")
          return
        }
        for(const socketId of receiverSockets){
          io.to(socketId).emit("gameInvite", {
            sender: socket.user
          })
        }
        console.log("sent to: ", friendId);
        console.log("sent by: ", socket.user.fullName);
      } catch (error) {
        console.log(`The user is not online !\n`, error);
        
      }
    });

    socket.on("acceptInvite", async ({senderId}) => {
      console.log("accepted", senderId);
      const senderSockets = onlineUsers.get(senderId)
      console.log(senderSockets);
      const roomId = crypto.randomUUID()
      socket.join(roomId)

      for(const socketId of senderSockets){
        io.sockets.sockets.get(socketId)?.join(roomId)
      }

      const payload = {
        roomId,
        white: senderId,
        black: socket.user._id
      }

      io.to(roomId).emit("gameStarted", payload);
    })

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
