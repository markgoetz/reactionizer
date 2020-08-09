import React from 'react';
import PropTypes from 'prop-types';

require('./_selectorbutton.scss');

const SelectorButton = (props) => {
  const handleClick = () => {
    props.onButtonClick(props.value);
  };

  const modifier = props.selected ? ' selected' : '';
  const className = `selectorbutton${modifier}`;
  const id = `${props.type}_count_selector_${props.value}`;

  return (
    <button
      className={className}
      id={id}
      disabled={props.disabled}
      onClick={handleClick}
      type="button"
    >
      {props.value}
    </button>
  );
};

export default SelectorButton;

SelectorButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
