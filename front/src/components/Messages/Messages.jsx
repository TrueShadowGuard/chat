import React from 'react';
import {observer} from "mobx-react";
import ScrollBars from "react-custom-scrollbars";
import store from "../../state/chatStore";
import Message from "../Message/Message";
import eventNames from "../../events/eventNames";

const ee = require('../../events/eventEmitter');

const Messages = observer(() => {
  const scrollbarsRef = React.useRef();
  React.useEffect(listenNewMessages);

  return (
    <ScrollBars style={{width: '100%', height: '80%'}}
                ref={scrollbarsRef}
    >
      <div>
        {store.messages?.map((m, i) => (
          <Message text={m.text}
                   author={m.author}
                   time={m.time}
                   key={i}
          />
        ))}
      </div>
    </ScrollBars>
  );

  function listenNewMessages() {
    const listener = () => {
      setTimeout(() => {
        scrollbarsRef.current.scrollToBottom();
      });
    }


    ee.on(eventNames.MESSAGE_ADDED, listener);
    return () => ee.off(eventNames.MESSAGE_ADDED, listener);
  }
});

export default Messages;
