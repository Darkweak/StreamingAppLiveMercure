import http from 'http';
import socketIo from 'socket.io';

const server = http.createServer();
const io = socketIo(server, {
  serveClient: false,
  pingInterval: 1000,
  pingTimeout: 5000,
  cookie: false,
});

server.listen(25565);

export default io;
