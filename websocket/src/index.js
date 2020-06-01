import io from './utils/socket';
import axios from 'axios';
import http from 'http';

const clients = [];

http.createServer((req, res) => {
  if (clients.length) {
    const firstClient = clients[0];
    const result = req.url.replace(/=/,'$').split('$')[1];
    firstClient.broadcast.emit('update', result);
    firstClient.emit('update', result);
  }
  res.writeHead(202);
  res.end();
}).listen(25564);

io.sockets.on('connection', socket => {
  clients.push(socket);
  axios
    .get('http://api-StreamingAppLiveMercure/urls/1')
    .then(({ data }) => socket.emit('update', data.url))
});
