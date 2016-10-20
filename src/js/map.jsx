var React = require("react");
var ReactGoogleMaps = require("react-google-maps");
var GoogleMapLoader = ReactGoogleMaps.GoogleMapLoader;
var GoogleMap = ReactGoogleMaps.GoogleMap;
var Polyline = ReactGoogleMaps.Polyline;
var Marker = ReactGoogleMaps.Marker;

var Map = React.createClass({
	propTypes: {
		league: React.PropTypes.array
	},
	_getPolylines: function (league) {
		var polylines = [];

		/*for (var c = 0; c < league.length; c++) {
			var conference = league[c];
			for (var d = 0; d < division.length; d++) {
				var division = conference[d];

				for (var t = 0; t < division.length; t++) {
					polylines.push(
						<Polyline  />
					);
				}
			}
		}*/


		return polylines;
	},

	_getMarkers: function(league) {
		var markers = [];

		for (var c = 0; c < league.length; c++) {
			var conference = league[c];
			for (var d = 0; d < conference.length; d++) {
				var division = conference[d];

				for (var t = 0; t < division.length; t++) {
					var team = division[t];
					console.log(team);
					markers.push(
						<Marker
							position={ { lat: team.lat, lng: team.lon } }
							icon={team.getLogoURL()}
							key={team.id}
						/>
					);
				}
			}
		}

		return markers;
	},

	render: function() {
		var polyline_nodes = this._getPolylines(this.props.league);
		var marker_nodes = this._getMarkers(this.props.league);

		return <GoogleMapLoader
			containerElement={<div id="map" />}
			googleMapElement={
				<GoogleMap
					defaultZoom={4}
					maxZoom={6}
					minZoom={3}
					defaultCenter={ {lat: 41, lng: -96} }>
						{polyline_nodes}
						{marker_nodes}
				</GoogleMap>
			} 
		/>;
	}
});

module.exports = Map;