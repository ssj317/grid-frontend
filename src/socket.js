import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

console.log("🔌 Initializing socket connection to:", SOCKET_URL);

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log(" Socket connected! ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log(" Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error(" Socket connection error:", error.message);
});
