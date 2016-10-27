var React = require("react");
var ReactGoogleMaps = require("react-google-maps");

require("./_map.scss");

var GoogleMapLoader = ReactGoogleMaps.GoogleMapLoader;
var GoogleMap = ReactGoogleMaps.GoogleMap;

var MarkerIcon = require("./markericon");
var MarkerBackground = require("./markerbackground");

var Map = React.createClass({
	propTypes: {
		league: React.PropTypes.array
	},

	_getMarkers: function(league) {
		var markers = [];	

		for (var c = 0; c < league.length; c++) {
			var conference = league[c];
			for (var d = 0; d < conference.length; d++) {
				var division = conference[d];

				for (var t = 0; t < division.length; t++) {
					var team = division[t];

					markers.push(<MarkerBackground team={team} conference={c} division={d} key={"bg" + team.id} />);
					markers.push(<MarkerIcon team={team} key={"icon" + team.id} />);
				}
			}
		}

		return markers;
	},

	render: function() {
		return <GoogleMapLoader
			containerElement={<div id="map" />}
			googleMapElement={
				<GoogleMap
					defaultZoom={4}
					maxZoom={6}
					minZoom={3}
					defaultCenter={ {lat: 41, lng: -96} }>
						{this._getMarkers(this.props.league)}
				</GoogleMap>
			} 
		/>;
	}
});

module.exports = Map;