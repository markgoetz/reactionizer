var React = require("react");

var SelectorButton = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		type: React.PropTypes.string,
		value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		onButtonClick: React.PropTypes.func
	},
	render: function() {
		var className = "div_button selector " + (this.props.selected ? " selected" : "") + (this.props.disabled ? " disabled" : "");
		var id = this.props.type + "_count_selector_" + this.props.value;
		return (<button
      className={className}
      id={id}
      disabled={this.props.disabled}
      onClick={this.handleClick}>
        {this.props.value}
      </button>);
	},
	handleClick: function() {
		this.props.onButtonClick(this.props.value);
	}
});

module.exports = SelectorButton;