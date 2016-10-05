var global_division_count = 4;
var global_conference_count = 1;
var static_teams;
var global_teams;
var global_cities;
var map;
var ga_timeout;
var global_polygons;
var global_markers;
var global_relocated_teams = new Array();

var conference_colors = new Array(new Array("#1B7EE0", "#0F4780", "#ADD6FF", "#899096", "#565A5E", "#C8D1DB"), new Array("#F5891D", "#944E07", "#FFD6AD"), new Array("#7EE01B", "#386907"));

function getDistanceWeight() {
	return $("#distance_weight_slider").slider("option", "value");
}

function getTimezoneWeight() {
	return $("#timezone_weight_slider").slider("option", "value");
}

function getRivalryWeight() {
	return $("#rivalry_weight_slider").slider("option", "value");
}

function getDivisionWeight() {
	return $("#division_weight_slider").slider("option", "value");
}

function initMap() {
	global_polygons = new Array();
	global_markers = new Array();

	var latlng = new google.maps.LatLng(41, -96);
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

		var ll = new google.maps.LatLng(team.lat, team.lon);
		global_markers[i] = new google.maps.Marker({
			position: ll,
			title: team.city + " " + team.name,
			icon: getLogoURL(team)
		});
		global_markers[i].setMap(map);
	}

	initPolygons();
}

function resetPolygons() {
	for (var i = 0; i < global_polygons.length; i++) {
		for (var j = 0; j < global_polygons[i].length; j++) {
			if (i < global_conference_count && j < global_division_count / global_conference_count) global_polygons[i][j].setMap(map);else global_polygons[i][j].setMap(null);
		}
	}

	//global_polygons = new Array();
}

function initPolygons() {
	for (var i = 0; i < conference_colors.length; i++) {
		var division_polygons = new Array();
		var conference_color_list = conference_colors[i];

		for (var j = 0; j < conference_color_list.length; j++) {
			var polygon = new google.maps.Polygon({
				strokeColor: conference_colors[i][j],
				strokeWeight: 3,
				fillColor: conference_colors[i][j],
				fillOpacity: 0
			});
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

function initialize(container_id, conferences, divisions, defaultString) {
	initData();
	//initMap();
	processBookmark();

	//updateCosts();

	ReactDOM.render(React.createElement(Divisionizer, { initConferences: conferences, initDivisions: divisions, teams: global_teams, cities: global_cities, initString: defaultString }), document.getElementById(container_id));
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

function initInterface() {
	var sorted_teams = global_teams.slice(0);
	sorted_teams.sort(function (a, b) {
		if (a.name < b.name) return -1;if (a.name > b.name) return 1;return 0;
	});
	for (var i = 0; i < sorted_teams.length; i++) {
		var index = global_teams.indexOf(sorted_teams[i]);
		$("#relocationizer_teams").append("<option value='" + index + "'>" + sorted_teams[i].name + "</option>");
	}
	for (i = 0; i < global_cities.length; i++) {
		$("#relocationizer_cities").append("<option value='" + i + "'>" + global_cities[i].city + "</option>");
	}
}

function initDivisions() {
	var div_string;

	if (location.hash) {
		var hash_pieces = location.hash.substring(1).split(":");
		div_string = hash_pieces[2];
	} else {
		div_string = DivisionList.getDefaultString();
	}

	return new DivisionList(div_string, global_conference_count, global_division_count);
}

function setBookmark(div_string) {
	div_string = global_conference_count + ":" + global_division_count + ":" + div_string;

	for (var i = 0; i < global_teams.length; i++) {
		if (global_relocated_teams[i]) {
			div_string += ":" + i + "^" + global_relocated_teams[i];
		}
	}

	location.hash = "#" + div_string;
	$("#fb_share").attr("href", "http://www.facebook.com/sharer/sharer.php?u=http://www.divisionizer.com/%23" + div_string);
	$("#tw_share").attr("href", "http://www.twitter.com/home?status=http://www.divisionizer.com/%23" + div_string);
}

function updateTableFormat(divisions) {
	$("#divisions").empty();

	var division_count = divisions.div_count;
	var conference_count = divisions.conf_count;
	var division_list = divisions.toArray();

	var divisions_per_conference = division_count / conference_count;
	for (var i = 0; i < conference_count; i++) {
		for (var j = 0; j < divisions_per_conference; j++) {
			$("#divisions").append("<div class='division column" + division_count + "' id='c" + i + "d" + j + "'><div class='header'>Division " + (j + 1) + "<div class='legend' style='background:" + conference_colors[i][j] + "'></div></div></div>");
			var current_division = division_list[i][j];
			for (var k = 0; k < current_division.length; k++) {
				$("#c" + i + "d" + j).append("<div class='team' id='c" + i + "d" + j + "t" + k + "'></div>");
			}
		}
	}

	$(".team").draggable({ revert: true }).droppable({ drop: handleDrop, hoverClass: "droppable" });
}

function updateMap(divisions) {
	var division_list = divisions.toArray();
	var divisions_per_conference = divisions.div_count / divisions.conf_count;
	for (var i = 0; i < divisions.conf_count; i++) {
		for (var j = 0; j < divisions_per_conference; j++) {
			var current_division = division_list[i][j];
			var polygon_point_list = new Array();

			for (var k = 0; k < current_division.length; k++) {
				var team = current_division[k];
				polygon_point_list.push(new google.maps.LatLng(team.lat, team.lon));
			}

			global_polygons[i][j].setPaths(polygon_point_list);
		}
	}
}

function getLogoURL(team) {
	return "logos/" + team.name.toLowerCase().replace(" ", "") + ".png";
}
function handleDrop(event, ui) {
	var divisions = initDivisions();
	var teams_per_conference = global_teams.length / divisions.conf_count;
	var teams_per_division = global_teams.length / divisions.div_count;

	var team1_id = $(this).attr("id");
	var team2_id = ui.draggable.attr("id");

	var team1_matches = team1_id.match(/\d+/g);
	var team1_offset = new Number(team1_matches[0]) * teams_per_conference + Math.ceil(new Number(team1_matches[1]) * teams_per_division) + new Number(team1_matches[2]);

	var team2_matches = team2_id.match(/\d+/g);
	var team2_offset = new Number(team2_matches[0]) * teams_per_conference + Math.ceil(new Number(team2_matches[1]) * teams_per_division) + new Number(team2_matches[2]);

	divisions.string = divisions.string.swapChars(team1_offset, team2_offset);
	delete divisions.conferences;

	ui.draggable.css("top", "0px").css("left", "0px");

	updateTable(divisions);
	updateMap(divisions);
	setBookmark(divisions.string);
}

function divisionize() {
	$("#divisionizer_on").show();
	$("#divisionizer_off").hide();

	$(".conf_button").addClass("disabled").attr("disabled", "disabled");
	$(".div_button").addClass("disabled").attr("disabled", "disabled");

	var population = new Array();
	continuing_flag = true;
	for (var i = 0; i < GA_GENERATION_SIZE; i++) {
		population.push(DivisionList.getRandom(global_conference_count, global_division_count));
	}

	gaIterate(population, GA_MAX_SURVIVORS);
}

function stop_divisionize() {
	$(".conf_button").removeClass("disabled").removeAttr("disabled");
	$(".div_button").addClass("disabled").attr("disabled", "disabled");

	$(".div_button").removeClass("disabled").removeAttr("disabled");

	if (global_conference_count == 3) {
		$("#division_count_selector_4").addClass("disabled").attr("disabled", "disabled");
		$("#division_count_selector_2").addClass("disabled").attr("disabled", "disabled");
	} else if (global_conference_count == 2) {
		$("#division_count_selector_3").addClass("disabled").attr("disabled", "disabled");
	}

	$("#divisionizer_on").hide();
	$("#divisionizer_off").show();
	//window.clearTimeout(ga_timeout);
	continuing_flag = false;
}

function randomInt(limit) {
	return Math.floor(Math.random() * limit);
}

String.prototype.swapChars = function (i, j) {
	if (i > j) {
		var temp = i;
		i = j;
		j = temp;
	}

	var swapchar1 = this.charAt(i);
	var swapchar2 = this.charAt(j);
	var block1 = this.substring(0, i);
	var block2 = this.substring(i + 1, j);
	var block3 = this.substring(j + 1, this.length);

	return block1 + swapchar2 + block2 + swapchar1 + block3;
};

String.prototype.setCharAt = function (index, newChar) {
	return this.substring(0, index) + newChar + this.substring(index + 1, this.length);
};
//# sourceMappingURL=interface.js.map
