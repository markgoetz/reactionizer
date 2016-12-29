import React, { PropTypes } from 'react';

require('./_selectorbutton.scss');

export default class SelectorButton extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onButtonClick: PropTypes.func,
  };

  handleClick() {
    this.props.onButtonClick(this.props.value);
  }

  render() {
    const className = `div_button selector${(this.props.selected ? ' selected' : '')}`;
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
