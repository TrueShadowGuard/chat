import {action, makeObservable, observable} from 'mobx';
import {toast} from "react-toastify";
import eventNames from "../events/eventNames";
const ee = require('../events/eventEmitter');

const {CLIENT_ACTIONS, SERVER_ACTIONS} = require("../consts");

class ChatStore {
  userName = undefined;
  messages = [];
  socket = undefined;

  constructor(props) {
    makeObservable(this, {
      userName: observable,
      messages: observable,
      identify: action,
      addMessage: action,
      setUserName: action
    });
    this.initSocket();
  }

  initSocket() {
    const HOST = 'ws://localhost:8080';
    //HOST = window.location.origin.replace(/^http/, 'ws');
    const socket = new WebSocket(HOST);
    this.socket = socket;
    socket.onopen = () => {
      console.log('connected to server');
      toast('Connected to server');
    }
    socket.onmessage = action => {
      action = JSON.parse(action.data);
      console.log('action', action);

      switch (action.type) {
        case SERVER_ACTIONS.NEW_MESSAGE:
          this.addMessage(action.data);
          break;
        case SERVER_ACTIONS.INIT:
          this.messages = action.data;
          ee.emit(eventNames.MESSAGE_ADDED);
          break;
        case SERVER_ACTIONS.NOTIFY_CONNECTION:
          toast(`${action.data.username} has joined chat`);
          break;
        case SERVER_ACTIONS.NOTIFY_LEFT:
          toast(`${action.data.username} has left chat`);
          break;
        default:
          console.error('Unknown action');
      }
    }
    socket.onclose = () => {
      this.setUserName(undefined);
      this.initSocket();
    }
  }

  sendToServer(type, data) {
    if (data !== undefined) {
      this.socket.send(JSON.stringify({type, data}));
    } else {
      this.socket.send(JSON.stringify({type}));
    }
  }

  sendMessage(text) {
    this.sendToServer(CLIENT_ACTIONS.SEND_MESSAGE, {text});
  }

  identify(username) {
    this.sendToServer(CLIENT_ACTIONS.IDENTIFICATION, {username})
    this.userName = username;
  }

  addMessage(message) {
    ee.emit(eventNames.MESSAGE_ADDED)
    this.messages.push(message);
  }

  setUserName(username) {
    this.userName = username;
  }
}

export default new ChatStore();
