import { createContext } from "react";
import { io, Socket } from 'socket.io-client'

const BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL as string;

export const socket = io(BASE_URL)
export const WebSocketContext = createContext<Socket>(socket)
export const WebSocketProvider = WebSocketContext.Provider;