var allTeams;
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
		initString: React.PropTypes.string,
		teamurl: React.PropTypes.string,
		cityurl: React.PropTypes.string
	},
	componentDidMount: function () {
		$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
			console.log(thrownError);
		});

		$.ajax({
			url: this.props.teamurl,
			context: this,
			dataType: "json"
		}).done(function (data) {
			this.setState({ teams: data });
		});

		$.ajax({
			url: this.props.cityurl,
			context: this,
			dataType: "json"
		}).done(function (data) {
			this.setState({ cities: data });
		});
	},
	getInitialState: function () {
		return {
			conference_count: this.props.initConferences,
			division_count: this.props.initDivisions,
			string: this.props.initString,
			teams: [],
			cities: [],
			max_id: 32
		};
	},
	onAddTeam: function (name) {
		allTeams.conferences[0].divisions[0].teams.push({ id: this.state.max_id++, name: name });
		this.setState({ teams: allTeams });
	},
	onConferenceChange: function (c, d) {
		this.setState({ conference_count: c, division_count: d });
	},
	render: function () {
		var league = [];

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
					React.createElement(Map, { league: league }),
					React.createElement(LeagueDisplay, { league: league })
				)
			),
			React.createElement(Footer, null)
		);
	}
});
//# sourceMappingURL=components.js.map
;var global_teams;
var static_teams;
var global_cities;

static_teams = [
	{city: "Anaheim",name:"Ducks", lat:33.807778,lon:-117.876667,orig_div:0,tz:3},
	{city: "Dallas",name:"Stars",lat:32.790556, lon:-96.810278,orig_div:0,tz:1},
	{city: "Los Angeles",name:"Kings",lat:34.043056, lon:-118.267222,orig_div:0,tz:3}, 
	{city: "Phoenix",name:"Coyotes",lat:33.531944, lon:-112.261111,orig_div:0,tz:2},
	{city: "San Jose",name:"Sharks",lat:37.332778, lon:-121.901111,orig_div:0,tz:3},	
	{city: "Calgary",name:"Flames",lat:51.0375, lon:-114.051944,orig_div:1,tz:2},
	{city: "Colorado",name:"Avalanche",lat:39.748611, lon:-105.0075,orig_div:1,tz:2},
	{city: "Edmonton",name:"Oilers",lat:53.571389, lon:-113.456111,orig_div:1,tz:2},
	{city: "Minnesota",name:"Wild",lat:44.944722, lon:-93.101111,orig_div:1,tz:1},
	{city:"Vancouver",name:"Canucks",lat:49.277778, lon:-123.108889,orig_div:1,tz:3},
	{city:"Columbus",name:"Blue Jackets",lat:39.969283, lon:-83.006111,orig_div:2,tz:0},
	{city:"Chicago",name:"Blackhawks",lat:41.880556, lon:-87.674167,orig_div:2,tz:1},
	{city:"Detroit",name:"Red Wings",lat:42.325278, lon:-83.051389,orig_div:2,tz:0},
	{city:"Nashville",name:"Predators",lat:36.159167, lon:-86.778611,orig_div:2,tz:1},
	{city:"St. Louis",name:"Blues",lat:38.626667, lon:-90.2025,orig_div:2,tz:1},
	{city:"Boston",name:"Bruins",lat:42.366303, lon:-71.062228,orig_div:3,tz:0},
	{city:"Buffalo",name:"Sabres",lat:42.875, lon:-78.876389,orig_div:3,tz:0},
	{city:"Montreal",name:"Canadiens",lat:45.496111, lon:-73.569444,orig_div:3,tz:0},
	{city:"Ottawa",name:"Senators",lat:45.296944, lon:-75.927222,orig_div:3,tz:0},
	{city:"Toronto",name:"Maple Leafs",lat:43.643333, lon:-79.379167,orig_div:3,tz:0},
	{city:"New Jersey",name:"Devils",lat:40.733611, lon:-74.171111,orig_div:4,tz:0},
	{city:"New York",name:"Islanders",lat:40.722778, lon:-73.590556,orig_div:4,tz:0},
	{city:"New York",name:"Rangers",lat:40.750556, lon:-73.993611,orig_div:4,tz:0},
	{city:"Philadelphia",name:"Flyers",lat:39.901111, lon:-75.171944,orig_div:4,tz:0},
	{city:"Pittsburgh",name:"Penguins",lat:40.439444, lon:-79.989167,orig_div:4,tz:0},
	{city:"Carolina",name:"Hurricanes",lat:35.803333, lon:-78.721944,orig_div:5,tz:0},
	{city:"Florida",name:"Panthers",lat:26.158333, lon:-80.325556,orig_div:5,tz:0},
	{city:"Tampa Bay",name:"Lightning",lat:27.942778, lon:-82.451944,orig_div:5,tz:0},
	{city:"Washington",name:"Capitals",lat:38.898056, lon:-77.020833,orig_div:5,tz:0},
	{city:"Winnipeg",name:"Jets",lat:49.892892, lon:-97.143836,orig_div:-1,tz:1},
	{city:"Las Vegas",name:"Expansions",lat:36.175, lon:-115.136389,orig_div:-1,tz:3}
];

global_cities = [
	{city: "Atlanta",tz:0, lat:33.755, lon:-84.39},
	{city: "Hartford",tz:0, lat:41.762736, lon:-72.674286},
	{city: "Hamilton",tz:0, lat:43.255278, lon:-79.873056},
	{city: "Houston",tz:1, lat:29.762778, lon:-95.383056},
	{city: "Kansas City",tz:1, lat:39.109722, lon:-94.588611},
	{city: "Milwaukee",tz:1, lat:43.0522222, lon:-87.955833},
	{city: "Quebec City", tz:0, lat:46.816667, lon:-71.216667},
	{city: "Seattle", tz:3, lat:47.609722, lon:-122.333056}
];

function initData() {
	// make a deep copy
	global_teams = new Array();
	for (var i = 0; i < static_teams.length; i++) {
		var team = static_teams[i];
		global_teams.push({city:team.city, name: team.name, lat:team.lat, lon:team.lon, tz:team.tz, orig_div:team.orig_div});
	}
};var global_teams;
var DL_ENCODING_CHARS = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DL_DEFAULT_STRING = "IJCGRQFH9T72DEBOAPSNLKM1468053UVWXYZ";

function DivisionList(div_string, conference_count, division_count) {
	this.string = div_string;
	this.div_count = division_count;
	this.conf_count = conference_count;
}

DivisionList.prototype.toArray = function() {
	if (!this.conferences)
		this._breakdownDivisions();
	
	var conference_array = new Array();
	
	for (var i = 0; i < this.conferences.length; i++) {
		conference_array.push(new Array());
		var conference = this.conferences[i];
		for (var j = 0; j < conference.length; j++) {
			var division = conference[j];
			
			var division_array = new Array();
			for (var k = 0; k < division.length; k++) {
				var team_index = DL_ENCODING_CHARS.indexOf(division.charAt(k), 0);
				division_array.push(global_teams[team_index]);
			}
			
			conference_array[i][j] = division_array;
		}
	}
	return conference_array;
};

DivisionList.prototype._breakdownDivisions = function() {
	var _divisions, _conferences;
	if (this.div_count == 6) {
		_divisions = new Array(
			this.string.substring(0, 5),
			this.string.substring(5, 10),
			this.string.substring(10, 15),
			this.string.substring(15, 20),
			this.string.substring(20, 25),
			this.string.substring(25, 31)		
		);
	}
	
	else if (this.div_count == 4) {
		_divisions = new Array(
			this.string.substring(0, 8),
			this.string.substring(8, 15),
			this.string.substring(15, 23),
			this.string.substring(23, 31)
		);
	}
	
	else if (this.div_count == 3) {
		_divisions = new Array(
			this.string.substring(0, 10),
			this.string.substring(10, 20),
			this.string.substring(20, 31)
		);
	}
	
	else if (this.div_count == 2) {
		_divisions = new Array(
			this.string.substring(0, 15),
			this.string.substring(15, 31)
		);
	}
	
	var divisions_per_conference = this.div_count / this.conf_count;
	_conferences = new Array();
	for (var i = 0; i < this.conf_count; i++) {
		_conferences[i] = new Array();
		
		
		for (var j = i * divisions_per_conference; j < (i + 1) * divisions_per_conference; j++) {
			_conferences[i].push(_divisions[j]);
		}
	}
	
	this.conferences = _conferences;
	
	return _conferences;
};

DivisionList.getDefaultString = function() {
	return DL_DEFAULT_STRING.substring(0, global_teams.length);
};;var GA_GENERATION_SIZE = 80;
var GA_MAX_SURVIVORS = 28;
var GA_MIN_SURVIVORS = 10;
var GA_SURVIVORS_DELTA = -.3;
var GA_MUTATION_CHANCE = .4;

var GA_ITERATION_INTERVAL = 200;

var continuing_flag;
var ga_timeout;

function gaIterate(population, survivors) {
	window.clearTimeout(ga_timeout);
	for (var i = 0; i < population.length; i++){
		if (!population[i].score)
			population[i].calculateScore();
	}

	
	population.sort(byScore);
	
	updateTable(population[0]);
	updateMap(population[0]);
	
	if (continuing_flag) {
		for (i = Math.ceil(survivors); i < GA_GENERATION_SIZE; i++) {
			var father = randomInt(Math.ceil(survivors));
			var mother;
			
			do {
				mother = randomInt(Math.ceil(survivors));
			}while (mother == father);
			
			population[i] = population[father].crossWith(population[mother]);
		}
		
		for (i = 0; i < GA_GENERATION_SIZE; i++) {
			if (Math.random() < GA_MUTATION_CHANCE)
				population[i].mutate();
		}
		
		if (survivors > GA_MIN_SURVIVORS)
			survivors += GA_SURVIVORS_DELTA;
		ga_timeout = window.setTimeout(function() { gaIterate(population, survivors); },GA_ITERATION_INTERVAL);
	}
	else {
		setBookmark(population[0].string);
	}
}

function byScore(a,b) {
	return a.score - b.score;
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

function initialize(container_id, conferences, divisions, defaultString) {
	//initMap();
	processBookmark();

	//updateCosts();

	ReactDOM.render(React.createElement(Divisionizer, { initConferences: conferences, initDivisions: divisions, teamurl: "data/teams.json", cityurl: "data/cities.json", initString: defaultString }), document.getElementById(container_id));
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
