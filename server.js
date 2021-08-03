const express = require('express');
const ws = require('ws');
const router = require("./router");
const {CLIENT_ACTIONS, SERVER_ACTIONS} = require("./front/src/consts");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(router);
const server = app.listen(PORT, () => console.log(`Server started at ${PORT}`));
const wsServer = new ws.Server({server});

const messages = [];

wsServer.on('connection', connection => {
  connection.id = Math.random();

  connection.on('message', action => {
    action = JSON.parse(action);
    console.log('action', action);

    switch (action.type) {
      case CLIENT_ACTIONS.IDENTIFICATION:
        identify(connection, action.data.username);
        break;
      case CLIENT_ACTIONS.SEND_MESSAGE:
        const newMessage = {
          id: Math.random(),
          text: action.data.text,
          author: connection.username,
          time: new Date().toLocaleTimeString()
        };
        messages.push(newMessage);
        sendToClients(wsServer.clients, SERVER_ACTIONS.NEW_MESSAGE, newMessage);
        break;
      default:
        console.error('Unknown action');
    }
  });
  connection.on('close', () => {
    sendToClients(wsServer.clients, SERVER_ACTIONS.NOTIFY_LEFT, {username: connection.username});
  });
});

function sendToClient(connection, type, data) {
  if (data !== undefined) {
    connection.send(JSON.stringify({type, data}));
  } else {
    connection.send(JSON.stringify({type}));
  }
}

function sendToClients(connections, type, data) {
  connections.forEach(connection => sendToClient(connection, type, data));
}

function identify(connection, username) {
  connection.username = username;
  sendToClient(connection, SERVER_ACTIONS.INIT, messages);
  const clients = [...wsServer.clients].filter(conn => conn.id !== connection.id);
  sendToClients(clients, SERVER_ACTIONS.NOTIFY_CONNECTION, {username: connection.username});
}





