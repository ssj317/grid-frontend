import { io } from "socket.io-client";

const socketUrl = "http://localhost:5000";
console.log("🔌 Initializing socket connection to:", socketUrl);

export const socket = io(socketUrl);

socket.on("connect", () => {
  console.log("✅ Socket connected! ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

socket.on("connect_error", (error) => {
  console.error("🔴 Socket connection error:", error);
});
