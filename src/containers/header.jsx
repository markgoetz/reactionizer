import React from 'react';

require('./_header.scss');

export default function Header() {
  return (<header>
    <img src="/images/logo.png" width="176" height="40" alt="logo" />
  </header>);
}

module.exports = Header;
