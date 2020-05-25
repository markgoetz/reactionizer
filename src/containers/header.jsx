import React from 'react';
import './_header.scss';
import logo from '../assets/images/logo.png';

export default function Header() {
  return (<header className="header">
    <img src={logo} width="176" height="40" alt="logo" />
  </header>);
}

module.exports = Header;
