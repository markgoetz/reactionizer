import React from 'react';
import PropTypes from 'prop-types';

require('./_selectorbutton.scss');

export default class SelectorButton extends React.Component {
  handleClick = () => {
    this.props.onButtonClick(this.props.value);
  }

  render() {
    const modifier = this.props.selected ? ' selected' : '';
    const className = `selectorbutton${modifier}`;
    const id = `${this.props.type}_count_selector_${this.props.value}`;
    return (<button
      className={className}
      id={id}
      disabled={this.props.disabled}
      onClick={this.handleClick}
    >
      {this.props.value}
    </button>);
  }
}

SelectorButton.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onButtonClick: PropTypes.func,
};
