import http from 'http';
import socketio from 'socket.io';

const server: http.Server = http.createServer();
const io: socketio.Server = new socketio.Server(server);

io.on('connection', (socket: socketio.Socket) => {
  const socketId = socket.id;
  console.log(`[connect] socketId: ${socketId}`);

  let clientId = '';
  let roomId = '';
  let counter = 0;

  // Clientからのメッセージを受信
  socket.on('join_to_room', (data: { clientId: string; roomId: string }) => {
    roomId = data.roomId;
    clientId = data.clientId;
    socket.join(roomId);
    console.log(
      `[join to room] socketId: ${socketId} clientId: ${clientId} roomId: ${roomId}`,
    );
  });

  // Clientにメッセージを送信
  setInterval(() => {
    socket.to(roomId).emit('server_to_client', {
      message: {
        socketId,
        clientId,
        roomId,
        counter: counter++,
      },
    });
  }, 1000);
});

const port = 8080;
server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
