import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import AppBody from './AppBody';
import './index.css';

ReactDOM.render(
    <div id="body-div">
      <Header />
      <AppBody />
    </div>,
  document.getElementById('root')
);
