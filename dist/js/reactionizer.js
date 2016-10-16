var DivisionList;
var SettingsMenu;
var Map;
var LeagueDisplay;

var Header = React.createClass({
	displayName: "Header",

	render: function () {
		return React.createElement(
			"header",
			null,
			"header"
		);
	}
});

var Footer = React.createClass({
	displayName: "Footer",

	render: function () {
		return React.createElement(
			"footer",
			null,
			"footer"
		);
	}
});

var Divisionizer = React.createClass({
	displayName: "Divisionizer",

	propTypes: {
		initConferences: React.PropTypes.number,
		initDivisions: React.PropTypes.number,
		dataurl: React.PropTypes.string
	},
	componentDidMount: function () {
		$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
			alert(thrownError);
		});

		$.ajax({
			url: this.props.dataurl,
			context: this,
			dataType: "json"
		}).done(function (data) {
			this.setState({
				teams: data.teams,
				cities: data.cities,
				defaultdivs: data.defaultdivs,
				league: [],
				max_id: data.teams.length + 1
			});
			this._buildDivisions();
		});
	},
	getInitialState: function () {
		return {
			conference_count: this.props.initConferences,
			division_count: this.props.initDivisions,
			teams: [],
			cities: [],
			defaultdivs: [],
			league: [],
			max_id: 0
		};
	},
	onRelocateTeam: function (teamid, cityid) {
		var teams = this.state.teams;
		var team = teams[teamid];
		var city = this.state.cities[cityid];

		team.cityname = city.name;
		team.lat = city.lat;
		team.lon = city.lon;

		this.setState({ teams: teams });
		this._buildDivisions();
	},
	onAddTeam: function (name, cityid) {
		var city = this.state.cities[cityid];
		var team = {
			id: this.state.max_id++,
			name: name,
			city: city.name,
			lat: city.lat,
			lon: city.lon
		};

		var teams = this.state.teams;
		teams.push(team);

		//TODO: Update the strings.

		this._buildDivisions();
	},
	onConferenceChange: function (c, d) {
		this.setState({ conference_count: c, division_count: d });
		this._buildDivisions();
	},
	_buildDivisions: function () {
		var div_string = this.state.defaultdivs[this.state.conference_count + ":" + this.state.division_count];

		if (div_string) {
			var division = new DivisionList(div_string, this.state.conference_count, this.state.division_count, this.state.teams);
			this.setState({ league: division.toArray() });
		} else {
			this.setState({ league: [] });
		}
	},
	render: function () {
		return React.createElement(
			"div",
			{ id: "divisionizer" },
			React.createElement(Header, null),
			React.createElement(
				"div",
				{ className: "application" },
				React.createElement(SettingsMenu, {
					conferences: this.state.conference_count,
					divisions: this.state.division_count,
					teams: this.state.teams,
					cities: this.state.cities,
					onRelocateTeam: this.onRelocateTeam,
					onAddTeam: this.onAddTeam,
					onConferenceChange: this.onConferenceChange
				}),
				React.createElement(
					"div",
					{ className: "content" },
					React.createElement(Map, { league: this.state.league }),
					React.createElement(LeagueDisplay, { league: this.state.league })
				)
			),
			React.createElement(Footer, null)
		);
	}
});
//# sourceMappingURL=components.js.map
;function DivisionList(div_string, conference_count, division_count, all_teams) {
	this.all_teams = all_teams;
	this.div_count = division_count;
	this.conf_count = conference_count;
	this.div_string = div_string;
	var _divisions;

	var _setDivisions = function() {
		_divisions = [];

		for (var c = 0; c < this.conf_count; c++) {
			_divisions.push([]);
			for (var d = 0; d < this.div_count / this.conf_count; d++) {
				_divisions[c].push([]);
			}
		}

		for (var i = 0; i < this.all_teams.length; i++) {
			var div_string_elem = this.div_string[i] - 1;
			var divs_per_conference = this.div_count / this.conf_count;


			var conference = Math.floor(div_string_elem / divs_per_conference);
			var division = div_string_elem % divs_per_conference;

			_divisions[conference][division].push(this.all_teams[i]);
		}
	};

	(_setDivisions.bind(this))();

	this.toArray = function() {
		return _divisions;
	};

	this.moveTeam = function(team, div_number) {
		if (team < 0 || team > all_teams.length) return;
		if (div_number < 0 || div_number > division_count) return;

		this.div_string[team] = div_number;
		_setDivisions();
	};
};var global_division_count = 4;
var global_conference_count = 1;
var static_teams;
var global_teams;
var global_cities;
var map;
var global_polygons;
var global_markers;
var global_relocated_teams = new Array();

var conference_colors = new Array(new Array("#1B7EE0", "#0F4780", "#ADD6FF", "#899096", "#565A5E", "#C8D1DB"), new Array("#F5891D", "#944E07", "#FFD6AD"), new Array("#7EE01B", "#386907"));

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

function initialize(container_id, conferences, divisions) {
	//initMap();
	processBookmark();

	//updateCosts();

	ReactDOM.render(React.createElement(Divisionizer, { initConferences: conferences, initDivisions: divisions, dataurl: "data/data.json" }), document.getElementById(container_id));
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
			div_string += ":" + i + "^" + global_relocated_teams[i];
		}
	}

	location.hash = "#" + div_string;
	$("#fb_share").attr("href", "http://www.facebook.com/sharer/sharer.php?u=http://www.divisionizer.com/%23" + div_string);
	$("#tw_share").attr("href", "http://www.twitter.com/home?status=http://www.divisionizer.com/%23" + div_string);
}

function getLogoURL(team) {
	return "logos/" + team.name.toLowerCase().replace(" ", "") + ".png";
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
;var getLogoURL;
var dragula;

var LeagueDisplay = React.createClass({
	displayName: "LeagueDisplay",

	propTypes: {
		league: React.PropTypes.array
	},
	componentDidMount: function () {
		dragula(Array.prototype.slice.call(ReactDOM.findDOMNode(this).querySelectorAll(".division .list"))).on("drop", function (el, container) {
			alert(el.className + " " + container.className);
		});
	},
	render: function () {
		var nodes = this.props.league.map(function (conference, index) {
			return React.createElement(Conference, { conference: conference, key: index, number: index, count: this.props.league.length });
		}, this);

		return React.createElement(
			"div",
			{ id: "league" },
			nodes
		);
	}
});

var Conference = React.createClass({
	displayName: "Conference",

	propTypes: {
		conference: React.PropTypes.array,
		count: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function () {
		var division_nodes = this.props.conference.map(function (division, index) {
			return React.createElement(Division, { division: division, key: index, count: this.props.conference.length * this.props.count, conference: this.props.number, number: index });
		}, this);

		var className = "conference col-" + this.props.count;
		return React.createElement(
			"div",
			{ className: className },
			division_nodes
		);
	}
});

var Division = React.createClass({
	displayName: "Division",

	propTypes: {
		division: React.PropTypes.array,
		count: React.PropTypes.number,
		conference: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function () {
		var team_nodes = this.props.division.map(function (team) {
			return React.createElement(Team, { team: team, key: team.name });
		});

		var className = "division col-" + this.props.count + " conf-" + this.props.conference + " div-" + this.props.number;
		return React.createElement(
			"div",
			{ className: className },
			React.createElement(
				"div",
				{ className: "name" },
				"Name"
			),
			React.createElement(
				"div",
				{ className: "list" },
				team_nodes
			)
		);
	}
});

var Team = React.createClass({
	displayName: "Team",

	propTypes: {
		team: React.PropTypes.object
	},
	render: function () {
		var source = getLogoURL(this.props.team);
		return React.createElement(
			"div",
			{ className: "team" },
			React.createElement("img", { className: "team-logo", src: source }),
			React.createElement(
				"span",
				{ className: "city" },
				this.props.team.city
			),
			React.createElement(
				"span",
				{ className: "name" },
				" ",
				this.props.team.name
			)
		);
	}
});
//# sourceMappingURL=leaguedisplay.js.map
;var google;
var getLogoURL;

var Map = React.createClass({
	displayName: "Map",

	render: function () {
		//this._updatePolygons();
		//this._updatePins();

		return React.createElement("div", { id: "map" });
	},
	componentDidMount: function () {
		this.polygons = new Array();
		this.pins = new Array();

		var latlng = new google.maps.LatLng(41, -96);
		var myOptions = {
			zoom: 4,
			center: latlng,
			maxZoom: 6,
			minZoom: 3,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(document.getElementById("map"), myOptions);

		//this._initPins(this.props.league);
		//this._initPolygons(this.props.league);
	},

	_initPins: function (teams) {
		for (var i = 0; i < teams.length; i++) {
			var team = teams[i];

			var ll = new google.maps.LatLng(team.lat, team.lon);
			var pin = new google.maps.Marker({
				position: ll,
				title: team.city + " " + team.name,
				icon: getLogoURL(team)
			});
			pin.setMap(this.map);
			this.pins.push(pin);
		}
	},

	_initPolygons: function (teams) {
		// var conference_count = teams.length;
		// var division_count = teams[0].length;

	},

	_updatePins: function () {},

	_updatePolygons: function () {}
});
//# sourceMappingURL=map.js.map
;var SettingsMenu = React.createClass({
	displayName: "SettingsMenu",

	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		teams: React.PropTypes.array,
		cities: React.PropTypes.array,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function () {
		return { menu_open: false };
	},
	render: function () {
		var menu_class = this.state.menu_open ? "open" : "closed";
		var button_label = this.state.menu_open ? "close" : "open";

		return React.createElement(
			"div",
			{ id: "settings_container" },
			React.createElement(
				"h2",
				{ id: "settings_header" },
				React.createElement(
					"span",
					null,
					"Settings"
				),
				React.createElement(
					"button",
					{ onClick: this.toggleMenu },
					button_label
				)
			),
			React.createElement(
				"div",
				{ id: "settings_menu", className: menu_class },
				React.createElement(ConferenceSelector, { conferences: this.props.conferences, divisions: this.props.divisions, onConferenceChange: this.onConferenceChange }),
				React.createElement(Relocationizer, { teams: this.props.teams, cities: this.props.cities })
			)
		);
	},
	onConferenceChange: function (c, d) {
		this.props.onConferenceChange(c, d);
	},
	toggleMenu: function () {
		this.setState({ menu_open: !this.state.menu_open });
	}
});

var ConferenceSelector = React.createClass({
	displayName: "ConferenceSelector",

	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function () {
		return { conferences: this.props.conferences, divisions: this.props.divisions };
	},
	render: function () {
		var conference_nodes = [3, 2, 1].map(function (conference) {
			return React.createElement(SelectorButton, {
				type: "conference",
				key: "conference" + conference,
				value: conference,
				selected: conference == this.state.conferences,
				disabled: false,
				onButtonClick: this.conferenceUpdate });
		}, this);
		var division_nodes = [6, 4, 3, 2].map(function (division) {
			return React.createElement(SelectorButton, {
				type: "division",
				key: "division" + division,
				value: division,
				selected: division == this.state.divisions,
				disabled: division % this.state.conferences != 0,
				onButtonClick: this.divisionUpdate });
		}, this);

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Conferences"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"div",
						{ className: "selector-container" },
						conference_nodes
					)
				)
			),
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Divisions"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"div",
						{ className: "selector-container" },
						division_nodes
					)
				)
			)
		);
	},
	conferenceUpdate: function (c) {
		this.setState({ conferences: c });
		var d = this.state.divisions;

		if (this.state.divisions % c != 0) {
			d = 6;
			this.setState({ divisions: d });
		}

		this.props.onConferenceChange(c, d);
	},
	divisionUpdate: function (d) {
		this.setState({ divisions: d });
		this.props.onConferenceChange(this.state.conferences, d);
	}
});

var SelectorButton = React.createClass({
	displayName: "SelectorButton",

	propTypes: {
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		type: React.PropTypes.string,
		value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		onButtonClick: React.PropTypes.func
	},
	render: function () {
		var className = "div_button selector " + (this.props.selected ? " selected" : "") + (this.props.disabled ? " disabled" : "");
		var id = this.props.type + "_count_selector_" + this.props.value;
		return React.createElement(
			"button",
			{
				className: className,
				id: id,
				disabled: this.props.disabled,
				onClick: this.handleClick },
			this.props.value
		);
	},
	handleClick: function () {
		this.props.onButtonClick(this.props.value);
	}
});

var Relocationizer = React.createClass({
	displayName: "Relocationizer",

	propTypes: {
		teams: React.PropTypes.array,
		cities: React.PropTypes.array
	},
	render: function () {
		var team_nodes = this.props.teams.map(function (team) {
			return React.createElement(
				"option",
				{ key: team.name },
				team.name
			);
		});

		var city_nodes = this.props.cities.map(function (city) {
			return React.createElement(
				"option",
				{ key: city.city },
				city.city
			);
		});

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Relocate team"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"team"
					),
					React.createElement(
						"select",
						null,
						team_nodes
					)
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"to"
					),
					React.createElement(
						"select",
						null,
						city_nodes
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ className: "action" },
						"Relocate Team"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "field" },
				React.createElement(
					"h3",
					null,
					"Expansion team"
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"city"
					),
					React.createElement(
						"select",
						null,
						city_nodes
					)
				),
				React.createElement(
					"div",
					{ className: "subfield" },
					React.createElement(
						"label",
						null,
						"name"
					),
					React.createElement("input", { type: "text" })
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ className: "action" },
						"Create Team"
					)
				)
			)
		);
	}
});
//# sourceMappingURL=settingsmenu.js.map
