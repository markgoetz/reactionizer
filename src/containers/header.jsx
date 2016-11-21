var React = require("react");
require("./_header.scss");

var Header = React.createClass({
	render: function() {
		return <header>
			<img src="/images/logo.png" width="176" height="40" />
		</header>;
	}
});	

module.exports = Header;