var React = require("react");
var ReactGoogleMaps = require("react-google-maps");

var GoogleMapLoader = ReactGoogleMaps.GoogleMapLoader;
var GoogleMap = ReactGoogleMaps.GoogleMap;
var Marker = ReactGoogleMaps.Marker;

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

					var icon_background = {
						path: "M 0 -5 a 10 10 0 1 0 -5.00001 0",
						strokeColor: "#777777",
						strokeWeight: 3,
						fillColor: "#ffffff",
						fillOpacity: 1
					};

					// Render the background as a vector
					markers.push(
						<Marker
							position={ { lat: team.lat, lng: team.lon } }
							key={ "b" + team.id }
							icon={ icon_background }
							title={team.name}
							zIndex={-99}
						/>
					);

					// Render the logo as a separate marker
					markers.push(
						<Marker
							position={ { lat: team.lat, lng: team.lon } }
							icon={ {url: team.getLogoURL(), anchor: {x:10, y:10}} }
							key={team.id}
							title={team.name}
							zIndex={2}
						/>
					);

				}
			}
		}

		return markers;
	},

	render: function() {
		var marker_nodes = this._getMarkers(this.props.league);

		return <GoogleMapLoader
			containerElement={<div id="map" />}
			googleMapElement={
				<GoogleMap
					defaultZoom={4}
					maxZoom={6}
					minZoom={3}
					defaultCenter={ {lat: 41, lng: -96} }>
						{marker_nodes}
				</GoogleMap>
			} 
		/>;
	}
});

module.exports = Map;