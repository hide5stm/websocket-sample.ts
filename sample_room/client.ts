import { io } from 'socket.io-client';

const port = 8080;
const socket = io(`http://localhost:${port}`);

const clientId = process.argv[2];
const roomId = process.argv[3];
console.log(`clientId: ${clientId}  roomId: ${roomId}`);

socket.on('connect', () => {
  console.log('connect');
});

// Serverからメッセージを受信
socket.on('server_to_client', (data: { message: object }) => {
  console.log(JSON.stringify(data.message));
});

// Serverにメッセージを送信
socket.emit('join_to_room', { clientId, roomId });
