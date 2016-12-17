var React = require("react");
require("./_header.scss");

var Header = function() {
	return <header className="header">
		<img src="/images/logo.png" width="176" height="40" />
	</header>;
};

module.exports = Header;
