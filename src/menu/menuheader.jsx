var React = require("react");
require("./_menuheader.scss");

var MenuHeader = React.createClass({
	propTypes: {
		open: React.PropTypes.bool,
		click: React.PropTypes.func
	},
	render: function() {
		var button_label = (this.props.open) ? "close" : "open";

		return (
			<h2 id="settings_header">
				<span>Settings</span>
				<div className="button_container"><button onClick={this.props.click}>{button_label}</button></div>
			</h2>
		);
	}
});

module.exports = MenuHeader;