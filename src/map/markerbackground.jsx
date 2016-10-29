var React = require("react");
var Team = require("../league/team.model");
var Marker = require("react-google-maps").Marker;
var GoogleMapTeamIconModel = require("./googlemapteamiconmodel");
var conference_colors = require("!!sass-variables!../global/_conferencecolors.scss");

var MarkerBackground = React.createClass({
	propTypes: {
		team: React.PropTypes.instanceOf(Team).isRequired,
		division: React.PropTypes.number.isRequired,
		conference: React.PropTypes.number.isRequired,
		mapHolderRef: React.PropTypes.object
	},
	render: function() {
		var color = getColor(this.props.conference, this.props.division);
		var icon_background = new GoogleMapTeamIconModel(color);

		return <Marker
			position={ { lat: this.props.team.lat, lng: this.props.team.lon } }
			icon={ icon_background }
			title={this.props.team.name}
			zIndex={-99}
			mapHolderRef={this.props.mapHolderRef}
		/>;
	}
});

function getColor(conference, division) {
	return conference_colors["c" + conference + "d" + division + "color"];
}

module.exports = MarkerBackground;