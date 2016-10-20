var React = require("react");
var ReactGoogleMaps = require("react-google-maps");
var GoogleMapLoader = ReactGoogleMaps.GoogleMapLoader;
var GoogleMap = ReactGoogleMaps.GoogleMap;
var Polygon = ReactGoogleMaps.Polygon;
var Marker = ReactGoogleMaps.Marker;

var Map = React.createClass({
	propTypes: {
		league: React.PropTypes.array
	},
	_getPolygons: function (league) {
		var polygons = [];

		for (var c = 0; c < league.length; c++) {
			var conference = league[c];
			for (var d = 0; d < conference.length; d++) {
				var division = conference[d];
				var key = c + ":" + d;

				polygons.push(
					<Polygon
						key={key}
						fillColor="rgba(0,0,0,0)"
						fillOpacity={0.0}
						path={
							division.map(function(team) {
								return {lat:team.lat, lng:team.lon};
							})
						}
					/>
				);
			}
		}

		return polygons;
	},

	_getMarkers: function(league) {
		var markers = [];

		for (var c = 0; c < league.length; c++) {
			var conference = league[c];
			for (var d = 0; d < conference.length; d++) {
				var division = conference[d];

				for (var t = 0; t < division.length; t++) {
					var team = division[t];

					markers.push(
						<Marker
							position={ { lat: team.lat, lng: team.lon } }
							icon={team.getLogoURL()}
							key={team.id}
							title={team.name}
						/>
					);
				}
			}
		}

		return markers;
	},

	render: function() {
		var polygon_nodes = this._getPolygons(this.props.league);
		var marker_nodes = this._getMarkers(this.props.league);

		return <GoogleMapLoader
			containerElement={<div id="map" />}
			googleMapElement={
				<GoogleMap
					defaultZoom={4}
					maxZoom={6}
					minZoom={3}
					defaultCenter={ {lat: 41, lng: -96} }>
						{polygon_nodes}
						{marker_nodes}
				</GoogleMap>
			} 
		/>;
	}
});

module.exports = Map;