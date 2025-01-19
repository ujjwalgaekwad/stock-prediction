import { io } from "socket.io-client";

let socket= null;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_ORIGIN, {
      query: { userId },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => socket;
