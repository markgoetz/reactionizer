import React from 'react';

require('./_menuheader.scss');

export default function MenuHeader(props) {
  const buttonLabel = (props.open) ? 'close' : 'open';

  return (
    <h2 id="settings_header">
      <span>Settings</span>
      <div className="button_container">
        <button onClick={props.click}>{buttonLabel}</button>
      </div>
    </h2>
  );
}

MenuHeader.propTypes = {
  open: React.PropTypes.bool,
  click: React.PropTypes.func,
};
