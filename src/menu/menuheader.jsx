import React from 'react';

import styles from './_menuheader.scss';

export default function MenuHeader(props) {
  const buttonLabel = (props.open) ? 'close' : 'open';

  return (
    <h2 id="menuheader">
      <span>Settings</span>
      <div className="buttoncontainer">
        <button onClick={props.click}>{buttonLabel}</button>
      </div>
    </h2>
  );
}

MenuHeader.propTypes = {
  open: React.PropTypes.bool,
  click: React.PropTypes.func,
};
