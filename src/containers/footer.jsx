var React = require("react");
require("./_footer.scss");

var Footer = React.createClass({
	render: function() {
		var year = new Date().getYear() + 1900;
		return <footer>Divisionizer is copyright &copy; {year} <a href="http://www.markandrewgoetz.com/" target="_blank">Mark Goetz</a></footer>;
	}
});	

module.exports = Footer;