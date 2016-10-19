var React = require("react");
var Maps = require("google-maps");

var Map = React.createClass({
	render: function() {
    //this._updatePolygons();
    //this._updatePins();

		return <div id="map">
			<GoogleMap defaultZoom={4} maxZoom={6} minZoom={3} defaultCenter={ {lat: 41, lon: -96} } />
		</div>;
	},
	componentDidMount: function() {
		this.polygons = new Array();
		this.pins = new Array();
  
		/*var latlng = new google.maps.LatLng(41,-96);
		var myOptions = {
			zoom: 4,
			center: latlng,
			maxZoom: 6,
			minZoom: 3,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		return <GoogleMap
		this.map = new google.maps.Map(document.getElementById("map"), myOptions);*/

    //this._initPins(this.props.league);
    //this._initPolygons(this.props.league);
	},

	_initPins: function(teams) {
		for (var i = 0; i < teams.length; i++) {
			var team = teams[i];

			var ll = new google.maps.LatLng(team.lat,team.lon);
			var pin = new google.maps.Marker(
				{
					position:ll,
					title:team.city + " " + team.name,
					icon:team.getLogoURL()
				}
      );
			pin.setMap(this.map);
			this.pins.push(pin);
		}
	},

	_initPolygons: function(teams) {
		// var conference_count = teams.length;
		// var division_count = teams[0].length;


	},

	_updatePins: function () {

	},

	_updatePolygons: function() {

	}
});

module.exports = Map;