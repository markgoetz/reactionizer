import React from 'react';
import PropTypes from 'prop-types';

import './_headerwithbutton.scss';

export default function HeaderWithButton(props) {
  return (
    <div className="headerwithbutton">
      <span className="headerwithbutton_title">
        {props.title}
        {props.bubbleText.length > 0 && (
          <span className="changedteams_count">{props.bubbleText}</span>
        )}
      </span>
      <div className="headerwithbutton_button">
        <button onClick={props.onClick} type="button">
          {props.buttonLabel}
        </button>
      </div>
    </div>
  );
}

HeaderWithButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bubbleText: PropTypes.string,
};

HeaderWithButton.defaultProps = {
  bubbleText: '',
};
