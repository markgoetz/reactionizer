var React = require("react");
var ReactDOM = require("react-dom");
var Divisionizer = require("./components.jsx");
var css = require("../scss/reactionizer.scss");

var global_markers;
var global_relocated_teams = new Array();

var conference_colors = new Array(
	new Array("#1B7EE0", "#0F4780", "#ADD6FF", "#899096", "#565A5E", "#C8D1DB"),
	new Array("#F5891D", "#944E07", "#FFD6AD"),
	new Array("#7EE01B", "#386907")
);

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