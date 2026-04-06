// server/server.js
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 5000 });

let messages = [];

server.on("connection", (socket) => {
  console.log("User connected");

  // Send previous messages
  socket.send(JSON.stringify(messages));

  socket.on("message", (data) => {
    const message = data.toString();

    messages.push(message);

    // Broadcast message to all clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([message]));
      }
    });
  });

  socket.on("close", () => {
    console.log("User disconnected");
  });
});