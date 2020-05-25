import React from 'react';
import './_footer.scss';

export default function Footer() {
  const year = new Date().getYear() + 1900;
  return (<footer className="footer">
    Divisionizer is copyright &copy; {year}&nbsp;
    <a href="http://www.markandrewgoetz.com/" target="_blank" rel="noopener noreferrer">Mark Goetz</a>
  </footer>);
}
