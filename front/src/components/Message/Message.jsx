import React from 'react';
import s from './message.module.css';

const Message = ({author, text, time}) => (
  <div className={s.message}>
    <div className={s.title}>
      <strong>{author}</strong><span className={s.time}> {time}</span>
    </div>
    <div className={s.text}>{text}</div>
  </div>
);

export default Message;
