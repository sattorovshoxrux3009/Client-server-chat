const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Yangi client qo`shildi');

  socket.on('message', (message) => {
    console.log(`Xabar => ${message}`);
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Klient uzildi');
  });
});

console.log('WebSocket server ws://localhost:8080 da ishlamoqda');
