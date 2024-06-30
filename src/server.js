import { io } from "socket.io-client";
const REACT_APP_BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY
const REACT_APP_PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND

const socket = io(`${REACT_APP_PROD_BACKEND}:5001`);
// const socket = io(`${REACT_APP_BACKEND_PROXY}:5001`)
// const socket = io(`http://localhost:5001`);

export default socket;
