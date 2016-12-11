var React = require("react");

var logos = require.context("../logos/");
logos.keys().forEach(logos);

var TeamLogoComponent = function(props) {
	return <svg className={props.className}>
		<use xlinkHref={"#" + props.id} />
	</svg>;
};

TeamLogoComponent.propTypes = {
	className: React.PropTypes.string,
	id: React.PropTypes.string.isRequired
};

var TeamLogoGetInlineSVG = function(id) {
	var svg_element = document.getElementById(id);
	if (svg_element == null) throw new ReferenceError();

	var svg = svg_element.innerHTML;
	return "<svg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'>" +
		svg +
		"</svg>";
};

module.exports = {
	component: TeamLogoComponent,
	inline: TeamLogoGetInlineSVG
};
