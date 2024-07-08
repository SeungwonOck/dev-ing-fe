import { io } from "socket.io-client";
const REACT_APP_BACKEND_SOCKET = process.env.REACT_APP_BACKEND_SOCKET

const socket = io('http://localhost:5001');
// const socket = io(REACT_APP_BACKEND_SOCKET);

export default socket;