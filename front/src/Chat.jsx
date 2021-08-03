import React from 'react';
import store from './state/chatStore'
import {observer} from "mobx-react";
import Messages from "./components/Messages/Messages";
import ChatControls from "./components/ChatControls/ChatControls";
import Identification from "./components/Identification/Identification";
import s from './chat.module.css';

const Chat = observer(() => {
  if (store.userName === undefined) return <Identification/>
  return (
    <div className={s.chat}>
      <h1 className={s.title}>ChatApp</h1>
      <Messages/>
      <ChatControls/>
    </div>
  );
});

export default Chat;


