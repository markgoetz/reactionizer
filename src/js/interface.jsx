var React = require("react");
var ReactDOM = require("react-dom");
var Divisionizer = require("./components.jsx");

var global_polygons;
var global_markers;
var global_relocated_teams = new Array();

var conference_colors = new Array(
	new Array("#1B7EE0", "#0F4780", "#ADD6FF", "#899096", "#565A5E", "#C8D1DB"),
	new Array("#F5891D", "#944E07", "#FFD6AD"),
	new Array("#7EE01B", "#386907")
);

function initMap() {
	global_polygons = new Array();
	global_markers = new Array();
	
	var latlng = new google.maps.LatLng(41,-96);
	var myOptions = {
		zoom: 4,
		center: latlng,
		maxZoom: 6,
		minZoom: 3,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	for (var i = 0; i < global_teams.length; i++) {
		var team = global_teams[i];

		var ll = new google.maps.LatLng(team.lat,team.lon);
		global_markers[i] = new google.maps.Marker(
			{
				position:ll,
				title:team.city + " " + team.name,
				icon:getLogoURL(team)
			}
		);
		global_markers[i].setMap(map);
	}
	
	initPolygons();
}

function resetPolygons() {
	for (var i = 0; i < global_polygons.length; i++) {
		for (var j = 0; j < global_polygons[i].length; j++) {
			if (i < global_conference_count && j < global_division_count / global_conference_count)
				global_polygons[i][j].setMap(map);
			else
				global_polygons[i][j].setMap(null);
		}
	}
	
	//global_polygons = new Array();
}

function initPolygons() {
	for (var i = 0; i < conference_colors.length; i++) {
		var division_polygons = new Array();
		var conference_color_list = conference_colors[i];
		
		for (var j = 0; j < conference_color_list.length; j++) {
			var polygon = new google.maps.Polygon(
				{
					strokeColor: conference_colors[i][j],
					strokeWeight: 3,
					fillColor: conference_colors[i][j],
					fillOpacity: 0
				}
			);
			polygon.setMap(map);
			division_polygons.push(polygon);
		}
		global_polygons.push(division_polygons);
	}
}

function moveTeamMarker(team, lat, lon) {
	global_markers[team].setPosition(new google.maps.LatLng(lat, lon));
	global_markers[team].setAnimation(google.maps.Animation.DROP);
}

function initialize(container_id, conferences, divisions) {
	//initMap();
	processBookmark();

	//updateCosts();
	
	ReactDOM.render(
		<Divisionizer initConferences={conferences} initDivisions={divisions} dataurl="data/data.json" />,
		document.getElementById(container_id)
    );  
	//updateTableFormat(divisions);
	//setBookmark(divisions.string);
}

function processBookmark() {
	if (location.hash) {
		var hash_pieces = location.hash.substring(1).split(":");
		global_conference_count = hash_pieces[0];
		global_division_count = hash_pieces[1];
		
		for (var i = 3; i < hash_pieces.length; i++) {
			var relocated_team = hash_pieces[i];
			var team_pieces = relocated_team.split("^");
			changeTeamCity(team_pieces[0], team_pieces[1]);
		}
	}
}



function setBookmark(div_string) {
	div_string = global_conference_count + ":" + global_division_count + ":" + div_string;
	
	for (var i = 0; i < global_teams.length; i++) {
		if (global_relocated_teams[i]) {
			div_string += (":" + i + "^" + global_relocated_teams[i]);
		}
	}
	
	location.hash = "#" + div_string;
	$("#fb_share").attr("href", "http://www.facebook.com/sharer/sharer.php?u=http://www.divisionizer.com/%23" + div_string);
	$("#tw_share").attr("href", "http://www.twitter.com/home?status=http://www.divisionizer.com/%23" + div_string);
}

String.prototype.setCharAt = function(index, newChar) {
	return this.substring(0, index).concat(newChar, this.substring(index+1,this.length));
};

initialize("container", 2, 4);