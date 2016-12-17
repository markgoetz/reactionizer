var React = require("react");
var ReactGoogleMaps = require("react-google-maps");

require("./_map.scss");

var GoogleMapLoader = ReactGoogleMaps.GoogleMapLoader;
var GoogleMap = ReactGoogleMaps.GoogleMap;

var MarkerIcon = require("./markericon");
var MarkerBackground = require("./markerbackground");
var map_style = require("./mapstyle.json");

var Map = React.createClass({
	propTypes: {
		league: React.PropTypes.array,
		mapHolderRef: React.PropTypes.object
	},

	render: function() {
		return <GoogleMapLoader
			containerElement={<div className="map" />}
			googleMapElement={ this._getMap() }
		/>;
	},

	_getMarkers: function(league) {
		var markers = [];

		var single_conference = (league.length == 1);

		for (var c = 0; c < league.length; c++) {
			var conference = league[c];
			for (var d = 0; d < conference.length; d++) {
				var division = conference[d];

				for (var t = 0; t < division.length; t++) {
					var team = division[t];

					markers.push(<MarkerBackground
						team={team}
						conference={c}
						division={d}
						singleConference={single_conference}
						key={"bg" + team.id}
						mapHolderRef={this.props.mapHolderRef}
					/>);

					markers.push(<MarkerIcon
						team={team}
						key={"icon" + team.id}
						mapHolderRef={this.props.mapHolderRef}
					/>);
				}
			}
		}

		return markers;
	},

	_getMap: function() {
		return <GoogleMap
			defaultZoom={4}
			maxZoom={6}
			minZoom={3}
			defaultCenter={ {lat: 41, lng: -96} }
			options={ { mapTypeControl: false, streetViewControl: false, styles: map_style } }>
				{this._getMarkers(this.props.league)}
		</GoogleMap>;
	}
});

module.exports = Map;
