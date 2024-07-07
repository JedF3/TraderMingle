import { io } from "socket.io-client";
const URL = 'https://tradermingle.onrender.com/'; 
export const socket = io(URL);