import React from 'react';
import styles from './_header.scss';

export default function Header() {
  return (<header className="header">
    <img src={require('../assets/images/logo.png')} width="176" height="40" alt="logo" />
  </header>);
}

module.exports = Header;
