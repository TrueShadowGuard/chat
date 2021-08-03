import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from "./Chat";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Chat />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
