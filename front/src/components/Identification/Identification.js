import * as React from "react";
import {observer} from "mobx-react";

import store from "../../state/chatStore";
import useKeyPressListener from "../../hooks/useKeyPressListener";
import s from './identification.module.css';

const Identification = observer(() => {
  const [value, setValue] = React.useState('');

  const joinChat = () => {
    store.identify(value)
  }

  useKeyPressListener('Enter', joinChat)

  return (
    <div className={s.identification}>
      <input placeholder="Enter your name" value={value} onChange={e => setValue(e.target.value)}/>
      <button onClick={joinChat} disabled={!value}>Join chat</button>
    </div>
  )
});

export default Identification;
