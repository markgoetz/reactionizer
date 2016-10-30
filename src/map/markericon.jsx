var React = require("react");
var Team = require("../league/team.model");
var Marker = require("react-google-maps").Marker;

var MarkerIcon = React.createClass({
	propTypes: {
		team: React.PropTypes.instanceOf(Team).isRequired,
		mapHolderRef: React.PropTypes.object
	},
	render: function() {
		return <Marker
			position={ { lat: this.props.team.lat, lng: this.props.team.lon } }
			icon={ {url: this.props.team.getLogoURL(), anchor: {x:15, y:15}, size: { height: 30, width: 30 }} }
			title={this.props.team.name}
			zIndex={2}
			mapHolderRef={this.props.mapHolderRef}
		/>;
	}
});

module.exports = MarkerIcon;