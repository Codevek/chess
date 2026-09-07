import { io } from "socket.io-client";

// Keep one socket instance for the whole browser tab.  It is deliberately
// disconnected until the login endpoint has set the HTTP-only auth cookie.
const socket = io("http://localhost:5000", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
