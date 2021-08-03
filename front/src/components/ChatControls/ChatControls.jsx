import * as React from "react";
import {observer} from "mobx-react";
import store from "../../state/chatStore";
import s from './chatControls.module.css';
import useKeyPressListener from "../../hooks/useKeyPressListener";

const Controls = observer(() => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  useKeyPressListener('Enter', () => {
    console.log('ENTER PRESSED');
    sendMessage();
  });
  React.useEffect(focusInput);

  return (
    <div className={s.controls}>
      <input className={s.messageInput}
             ref={inputRef}
             value={value}
             onChange={e => {
               setValue(e.target.value);
             }}
             placeholder="Write a message..."
      />
      <button className={s.sendMessageButton}
              onClick={sendMessage}
              disabled={!value}
      >Send</button>
    </div>
  )

  function sendMessage() {
    if(!value) return;
    store.sendMessage(value);
    setValue('');
  }

  function focusInput() {
    inputRef.current.focus();
  }
});

export default Controls;
