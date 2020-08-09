import React from 'react';
import PropTypes from 'prop-types';

import './_headerwithbutton.scss';

export default function HeaderWithButton(props) {
  return (
    <div className="headerwithbutton">
      <span className="headerwithbutton_title">{props.title}</span>
      <div className="headerwithbutton_button">
        <button onClick={props.onClick} type="button">{props.buttonLabel}</button>
      </div>
    </div>
  );
}

HeaderWithButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};
