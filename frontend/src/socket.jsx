import { io } from "socket.io-client";
const URL = 'https://trader-mingle-jqkjj3174-jedidiah-franciscos-projects.vercel.app/'; 
export const socket = io(URL);