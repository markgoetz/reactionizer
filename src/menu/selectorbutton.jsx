import React, { PropTypes } from 'react';

require('./_selectorbutton.scss');

export default class SelectorButton extends React.Component {
  handleClick = () => {
    this.props.onButtonClick(this.props.value);
  }

  render() {
		const className = "selectorbutton" + (this.props.selected ? " selected" : "");
		var id = `${this.props.type}_count_selector_${this.props.value}`;
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
