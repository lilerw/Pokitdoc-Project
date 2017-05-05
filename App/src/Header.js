import React, { Component } from 'react';
import logo from './imgs/LogoFinished.png';
import './Header.css';


class Header extends Component {
  render() {
    return (
        <div className="App-header">
          <a href="index.html"><img src={logo} className="App-logo" alt="logo" /></a>
        </div>
    );
  }
}

export default Header;
