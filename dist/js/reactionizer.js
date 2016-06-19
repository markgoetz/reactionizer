var Header = React.createClass({
  displayName: "Header",

  render: function () {
    return React.createElement(
      "div",
      { id: "head-logo" },
      "header"
    );
  }
});

var SettingsMenu = React.createClass({
  displayName: "SettingsMenu",

  render: function () {
    return React.createElement(
      "div",
      { id: "settings_container" },
      React.createElement(
        "h2",
        { id: "settings_header" },
        "Settings",
        React.createElement(
          "button",
          null,
          "open"
        )
      ),
      React.createElement(
        "div",
        { id: "settings_menu" },
        React.createElement(ConferenceSelector, { conferences: this.props.conferences, divisions: this.props.divisions, onConferenceChange: this.onConferenceChange }),
        React.createElement(Relocationizer, { teams: this.props.teams, cities: this.props.cities })
      )
    );
  },
  onConferenceChange: function (c, d) {
    this.props.onConferenceChange(c, d);
  }
});

var ConferenceSelector = React.createClass({
  displayName: "ConferenceSelector",

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
      { className: "field" },
      React.createElement(
        "div",
        { className: "subfield" },
        React.createElement(
          "h3",
          null,
          "Conferences"
        ),
        React.createElement(
          "div",
          { className: "selector-container" },
          conference_nodes
        )
      ),
      React.createElement(
        "div",
        { className: "subfield" },
        React.createElement(
          "h3",
          null,
          "Divisions"
        ),
        React.createElement(
          "div",
          { className: "selector-container" },
          division_nodes
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

  render: function () {
    var className = "div_button selector " + (this.props.selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '');
    var id = this.props.type + '_count_selector_' + this.props.value;
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
  handleClick: function (e) {
    this.props.onButtonClick(this.props.value);
  }
});

var Relocationizer = React.createClass({
  displayName: "Relocationizer",

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
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              null,
              "from"
            ),
            React.createElement(
              "select",
              null,
              team_nodes
            )
          ),
          React.createElement(
            "div",
            null,
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
          null,
          React.createElement(
            "div",
            null,
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
            null,
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
      )
    );
  }
});

var Map = React.createClass({
  displayName: "Map",

  render: function () {
    return React.createElement(
      "div",
      { id: "map" },
      "This is a map."
    );
  }
});

var LeagueDisplay = React.createClass({
  displayName: "LeagueDisplay",

  render: function () {
    var nodes = this.props.league.map(function (conference, index) {
      return React.createElement(Conference, { conference: conference, key: index });
    });

    return React.createElement(
      "div",
      { id: "teams" },
      nodes
    );
  }
});

var Conference = React.createClass({
  displayName: "Conference",

  render: function () {
    var division_nodes = this.props.conference.map(function (division, index) {
      return React.createElement(Division, { division: division, key: index });
    });

    return React.createElement(
      "div",
      { className: "conference" },
      division_nodes
    );
  }
});

var Division = React.createClass({
  displayName: "Division",

  render: function () {
    var team_nodes = this.props.division.map(function (team) {
      return React.createElement(Team, { team: team, key: team.name });
    });

    return React.createElement(
      "div",
      { className: "division" },
      React.createElement(
        "div",
        { className: "name" },
        this.props.division.name
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

var Footer = React.createClass({
  displayName: "Footer",

  render: function () {
    return React.createElement(
      "div",
      { id: "footer" },
      "footer"
    );
  }
});

var Divisionizer = React.createClass({
  displayName: "Divisionizer",

  getInitialState: function () {
    return {
      conference_count: this.props.initConferences,
      division_count: this.props.initDivisions,
      string: this.props.initString
    };
  },
  onAddTeam: function (name) {
    allTeams.conferences[0].divisions[0].teams.push({ name: name });
    this.setState({ teams: allTeams });
  },
  onConferenceChange: function (c, d) {
    this.setState({ conference_count: c, division_count: d });
  },
  render: function () {
    var division_list = new DivisionList(this.state.string, this.state.conference_count, this.state.division_count);
    var teams = division_list.toArray();

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
          teams: this.props.teams,
          cities: this.props.cities,
          onRelocateTeam: this.onRelocateTeam,
          onAddTeam: this.onAddTeam,
          onConferenceChange: this.onConferenceChange
        }),
        React.createElement(
          "div",
          { className: "content" },
          React.createElement(Map, { league: teams }),
          React.createElement(LeagueDisplay, { league: teams })
        )
      ),
      React.createElement(Footer, null)
    );
  }
});
//# sourceMappingURL=components.js.map
;var distance_costs = new Array();
var rivalry_costs;
var timezone_costs = new Array();
var division_costs = new Array();
var costs = new Array();
var division_count;
var global_cities;
var global_teams;
var global_next_empty_division = -4;
var global_relocated_teams = new Array();
var static_teams;

var DIVISION_WEIGHT_MODIFIER = 1;
var RIVALRY_WEIGHT_MODIFIER  = 2;
var DISTANCE_WEIGHT_MODIFIER = 9;
var TIMEZONE_WEIGHT_MODIFIER = 3;

static_teams = [
	{city:'Anaheim',name:'Ducks', lat:33.807778,lon:-117.876667,orig_div:0,tz:3},
	{city:'Dallas',name:'Stars',lat:32.790556, lon:-96.810278,orig_div:0,tz:1},
	{city:'Los Angeles',name:'Kings',lat:34.043056, lon:-118.267222,orig_div:0,tz:3}, 
	{city:'Phoenix',name:'Coyotes',lat:33.531944, lon:-112.261111,orig_div:0,tz:2},
	{city:'San Jose',name:'Sharks',lat:37.332778, lon:-121.901111,orig_div:0,tz:3},	
	{city:'Calgary',name:'Flames',lat:51.0375, lon:-114.051944,orig_div:1,tz:2},
	{city:'Colorado',name:'Avalanche',lat:39.748611, lon:-105.0075,orig_div:1,tz:2},
	{city:'Edmonton',name:'Oilers',lat:53.571389, lon:-113.456111,orig_div:1,tz:2},
	{city:'Minnesota',name:'Wild',lat:44.944722, lon:-93.101111,orig_div:1,tz:1},
	{city:'Vancouver',name:'Canucks',lat:49.277778, lon:-123.108889,orig_div:1,tz:3},
	{city:'Columbus',name:'Blue Jackets',lat:39.969283, lon:-83.006111,orig_div:2,tz:0},
	{city:'Chicago',name:'Blackhawks',lat:41.880556, lon:-87.674167,orig_div:2,tz:1},
	{city:'Detroit',name:'Red Wings',lat:42.325278, lon:-83.051389,orig_div:2,tz:0},
	{city:'Nashville',name:'Predators',lat:36.159167, lon:-86.778611,orig_div:2,tz:1},
	{city:'St. Louis',name:'Blues',lat:38.626667, lon:-90.2025,orig_div:2,tz:1},
	{city:'Boston',name:'Bruins',lat:42.366303, lon:-71.062228,orig_div:3,tz:0},
	{city:'Buffalo',name:'Sabres',lat:42.875, lon:-78.876389,orig_div:3,tz:0},
	{city:'Montreal',name:'Canadiens',lat:45.496111, lon:-73.569444,orig_div:3,tz:0},
	{city:'Ottawa',name:'Senators',lat:45.296944, lon:-75.927222,orig_div:3,tz:0},
	{city:'Toronto',name:'Maple Leafs',lat:43.643333, lon:-79.379167,orig_div:3,tz:0},
	{city:'New Jersey',name:'Devils',lat:40.733611, lon:-74.171111,orig_div:4,tz:0},
	{city:'New York',name:'Islanders',lat:40.722778, lon:-73.590556,orig_div:4,tz:0},
	{city:'New York',name:'Rangers',lat:40.750556, lon:-73.993611,orig_div:4,tz:0},
	{city:'Philadelphia',name:'Flyers',lat:39.901111, lon:-75.171944,orig_div:4,tz:0},
	{city:'Pittsburgh',name:'Penguins',lat:40.439444, lon:-79.989167,orig_div:4,tz:0},
	{city:'Carolina',name:'Hurricanes',lat:35.803333, lon:-78.721944,orig_div:5,tz:0},
	{city:'Florida',name:'Panthers',lat:26.158333, lon:-80.325556,orig_div:5,tz:0},
	{city:'Tampa Bay',name:'Lightning',lat:27.942778, lon:-82.451944,orig_div:5,tz:0},
	{city:'Washington',name:'Capitals',lat:38.898056, lon:-77.020833,orig_div:5,tz:0},
	{city:'Winnipeg',name:'Jets',lat:49.892892, lon:-97.143836,orig_div:-1,tz:1}	
];

global_cities = [
  	{city: 'Atlanta',tz:0, lat:33.755, lon:-84.39},
	{city: 'Hartford',tz:0, lat:41.762736, lon:-72.674286},
	{city: 'Hamilton',tz:0, lat:43.255278, lon:-79.873056},
	{city: 'Houston',tz:1, lat:29.762778, lon:-95.383056},
	{city: 'Kansas City',tz:1, lat:39.109722, lon:-94.588611},
	{city: 'Las Vegas',tz:3, lat:36.175, lon:-115.136389},
	{city: 'Milwaukee',tz:1, lat:43.0522222, lon:-87.955833},
	{city: 'Quebec City', tz:0, lat:46.816667, lon:-71.216667},
	{city: 'Seattle', tz:3, lat:47.609722, lon:-122.333056}
];

var static_rivalry_costs = [
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// ducks
[2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// stars
[1,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// kings
[2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// coyotes
[1,2,1,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// sharks
[2,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// flames
[3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// avalanche
[2,3,2,4,4,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// oilers
[3,2,3,4,3,3,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// wild
[3,2,3,4,3,2,3,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// canucks
[4,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// blue jackets
[3,3,3,4,2,4,4,4,3,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// blackhawks
[2,2,3,3,2,3,2,3,3,3,3,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// red wings
[3,3,3,4,3,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// predators
[4,3,3,4,4,4,4,4,4,4,3,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// blues
[4,4,4,4,3,4,4,4,4,3,4,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// bruins
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// sabres
[4,4,3,4,4,3,4,3,4,3,4,2,1,4,3,0,2,4,4,4,4,4,4,4,4,4,4,4,4,4],	// canadiens
[3,4,4,4,4,3,4,3,4,3,4,4,4,4,4,3,2,2,4,4,4,4,4,4,4,4,4,4,4,4],	// senators
[4,4,4,4,4,3,4,3,4,3,4,2,1,4,4,0,1,0,2,4,4,4,4,4,4,4,4,4,4,4],	// maple leafs
[3,3,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4],	// devils
[4,4,4,4,4,4,4,3,4,4,4,3,4,4,4,4,3,3,4,4,2,4,4,4,4,4,4,4,4,4],	// islanders
[4,4,4,4,4,4,4,4,4,4,4,2,1,4,4,1,3,1,4,2,1,1,4,4,4,4,4,4,4,4],	// rangers
[4,4,4,4,4,4,4,4,4,4,4,2,4,4,4,2,3,2,3,4,1,2,1,4,4,4,4,4,4,4],	// philly
[4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,3,4,4,4,4,2,2,2,1,4,4,4,4,4,4],	// pittsburgh
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4],	// carolina
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4],	// florida
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,2,4,4,4],	// tampa
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,3,2,3,3,3,4,4],	// washington
[4,4,4,3,4,3,4,3,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]	// winnipeg
];


function initData() {
	// make a deep copy
	global_teams = new Array();
	for (var i = 0; i < static_teams.length; i++) {
		var team = static_teams[i];
		global_teams.push({city:team.city, name: team.name, lat:team.lat, lon:team.lon, tz:team.tz, orig_div:team.orig_div});
	}
	
	rivalry_costs = new Array();
	for (i = 0; i < static_rivalry_costs.length; i++) {
		var r = new Array();
		for (var j = 0; j < i; j++) {
			r.push(static_rivalry_costs[i][j] / 4.0);
		}
		rivalry_costs.push(r);
	}
	updateScoreMatrices(global_teams);
}

function updateScoreMatrices(teams) {
	var max_distance = 0.0;
	var max_timezone = 0.0;
	var max_division = 0.0;
	
	distance_costs = new Array();
	timezone_costs = new Array();
	division_costs = new Array();
	
	for (var i = 0; i < teams.length; i++) {
		distance_costs[i] = new Array();
		timezone_costs[i] = new Array();
		division_costs[i] = new Array();
		for (var j = 0; j < i; j++) {
			var team1 = teams[i];
			var team2 = teams[j];
			
			distance_costs[i][j] = getDistanceCost(team1, team2);
			if (distance_costs[i][j] > max_distance) max_distance = distance_costs[i][j];
			
			timezone_costs[i][j] = getTimeZoneCost(team1, team2);
			if (timezone_costs[i][j] > max_timezone) max_timezone = timezone_costs[i][j];
			
			division_costs[i][j] = getDivisionCost(team1, team2);
			if (division_costs[i][j] > max_division) max_division = division_costs[i][j];
		}
	}
	
	for (i = 0; i < teams.length; i++) {
		for (j = 0; j < i; j++) {
			distance_costs[i][j] = (distance_costs[i][j] / max_distance);
			timezone_costs[i][j] = (timezone_costs[i][j] / max_timezone);
			division_costs[i][j] = (division_costs[i][j] / max_division);
		}
	}
}

function getDistanceCost(team1, team2) {
	// convert to radians
	var lat1 = team1.lat * (Math.PI / 180);
	var lat2 = team2.lat * (Math.PI / 180);
	var lon1 = team1.lon * (Math.PI / 180);
	var lon2 = team2.lon * (Math.PI / 180);
	
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	return Math.sqrt(x*x + y*y);
}
	
function getTimeZoneCost(team1, team2) {
	return Math.abs(team1.tz - team2.tz);
}

function getDivisionCost(team1, team2) {
	if (team1.orig_div == team2.orig_div) return 0.0;
	else if (team1.orig_div % 3 == team2.orig_div % 3) return 2.0;
	return 3.0;
}

function updateCosts() {
	costs = new Array();
	
	var distance_weight = getDistanceWeight() * DISTANCE_WEIGHT_MODIFIER;
	var rivalry_weight  = getRivalryWeight()  * RIVALRY_WEIGHT_MODIFIER;
	var timezone_weight = getTimezoneWeight() * TIMEZONE_WEIGHT_MODIFIER;
	var division_weight = getDivisionWeight() * DIVISION_WEIGHT_MODIFIER;
	
	for (var i = 0; i < global_teams.length; i++) {
		costs[i] = new Array();
		for (var j = 0; j < i; j++) {
			costs[i][j] = distance_weight * distance_costs[i][j] +
				rivalry_weight * rivalry_costs[i][j] +
				timezone_weight * timezone_costs[i][j] +
				division_weight * division_costs[i][j];
		}
	}
}

function changeTeamCity(team, city) {
	global_teams[team].city = global_cities[city].city;
	global_teams[team].lat  = global_cities[city].lat;
	global_teams[team].lon  = global_cities[city].lon;
	global_teams[team].tz   = global_cities[city].tz;
	global_teams[team].orig_div = global_next_empty_division;
	global_next_empty_division -= 3;
	
	divisions = initDivisions();
	moveTeamMarker(team, global_cities[city].lat, global_cities[city].lon);
	updateTable(divisions);
	updateMap(divisions);
	updateScoreMatrices(global_teams);
	updateCosts();
	
	global_relocated_teams[team] = city;

	addMovedTeamRow(team, global_cities[city].city);
	setBookmark(divisions.string);
}

function revertTeamCity(team) {
	global_teams[team].city = static_teams[team].city;
	global_teams[team].lat  = static_teams[team].lat;
	global_teams[team].lon  = static_teams[team].lon;
	global_teams[team].tz   = static_teams[team].tz;	
	global_teams[team].orig_div = static_teams[team].orig_div;
	
	divisions = initDivisions();
	moveTeamMarker(team, static_teams[team].lat, static_teams[team].lon);
	updateTable(divisions);
	updateMap(divisions);
	updateScoreMatrices(global_teams);
	updateCosts();
	
	delete global_relocated_teams[team];
	setBookmark(divisions.string);
	
	removeMovedTeamRow(team);
};var DL_DIVISION_MULTIPLIER = 3;
var costs;
var global_teams;
var DL_ENCODING_CHARS = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DL_DEFAULT_STRING = "IJCGRQFH9T72DEBOAPSNLKM1468053UVWXYZ";
var DL_ENCODING_BREAK_CHAR = ' ';
var DL_MAX_MUTATIONS = 2;

function DivisionList(div_string, conference_count, division_count) {
	this.string = div_string;
	this.div_count = division_count;
	this.conf_count = conference_count;
	this.score = 0;
}

DivisionList.prototype.calculateScore = function() {
	this.score = 0;
	var multiplier;
	
	for (var i = 0; i < global_teams.length; i++) {
		for (var j = 0; j < i; j++) {
			if (this.inSameDivision(i, j)) {
				multiplier = DL_DIVISION_MULTIPLIER;
			}
			else if (this.inSameConference(i, j)) {
				multiplier = 1;
			}
			else {
				continue;
			}
			
			this.score += multiplier * costs[i][j];
		}
	}
};

DivisionList.prototype.crossWith = function(otherDivision) {
	var chars_already_used = new Array();
	var unused_chars = DivisionList.getDefaultString();
	var new_string = '';
	var new_char;
	
	// splice the two divisions together
	for (var i = 0; i < this.string.length; i++) {
		var this_char = this.string.charAt(i);
		var other_char = otherDivision.string.charAt(i);
		if (chars_already_used[this_char] && !chars_already_used[other_char]) {
			new_char = other_char;
		}
		else if (chars_already_used[other_char] && !chars_already_used[this_char]) {
			new_char = this_char;
		}
		else  {
			if (Math.random() > .5) {
				new_char = this.string.charAt(i);
			}
			else {
				new_char = otherDivision.string.charAt(i);
			}
		}
		
		// check to see if there are any errors
		if (chars_already_used[new_char]) {
			new_string = new_string + DL_ENCODING_BREAK_CHAR;
		}
		else {
			new_string = new_string + new_char;
			chars_already_used[new_char] = 1;
			unused_chars = unused_chars.setCharAt(unused_chars.indexOf(new_char), '');
		}
	}
	
	var break_pos = new_string.indexOf(DL_ENCODING_BREAK_CHAR, 0);
	while (break_pos > -1) {
		var random_missing_char_pos = randomInt(unused_chars.length);
		var random_missing_char = unused_chars.charAt(random_missing_char_pos);
		new_string = new_string.setCharAt(break_pos, random_missing_char);
		unused_chars = unused_chars.setCharAt(random_missing_char_pos, '');
		break_pos = new_string.indexOf(DL_ENCODING_BREAK_CHAR, 0);
	}
	
	return new DivisionList(new_string, this.conf_count, this.div_count);
};

DivisionList.prototype.mutate = function() {
	var m;
	var mutations = randomInt(DL_MAX_MUTATIONS) + 1;
	
	for (m = 0; m < mutations; m++) {
		var i = randomInt(this.string.length);
		var team1_number = DL_ENCODING_CHARS.indexOf(this.string.charAt(i));
		
		var j, team2_number;
		do {
			j = randomInt(this.string.length);
			team2_number = DL_ENCODING_CHARS.indexOf(this.string.charAt(j));
		} while (this.inSameDivision(team1_number, team2_number));
	
		this.string = this.string.swapChars(i, j);
	}
	
	delete this.score;
	delete this.conferences;
};

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

DivisionList.prototype.inSameDivision = function(team1, team2) {
	var team1_char = DL_ENCODING_CHARS.charAt(team1);
	var team2_char = DL_ENCODING_CHARS.charAt(team2);
	
	if (!this.conferences)
		this._breakdownDivisions();
	
	for (var i = 0; i < this.conferences.length; i++) {
		var conference = this.conferences[i];
		for (var j = 0; j < conference.length; j++) {
			var division = conference[j];
			if (division.indexOf(team1_char) > -1 && division.indexOf(team2_char) > -1)
				return true;
		}
	}
	return false;
}

DivisionList.prototype.inSameConference = function(team1, team2) {
	var team1_char = DL_ENCODING_CHARS.charAt(team1);
	var team2_char = DL_ENCODING_CHARS.charAt(team2);
	
	if (!this.conferences)
		this._breakdownDivisions();
	
	var found1_flag, found2_flag;
	
	for (var i = 0; i < this.conferences.length; i++) {
		found1_flag = false; found2_flag = false;
		var conference = this.conferences[i];
		for (var j = 0; j < conference.length; j++) {
			var division = conference[j];
			if (division.indexOf(team1_char) > -1) {
				found1_flag = true;
				if (found2_flag) return true;
			}
			if (division.indexOf(team2_char) > -1) {
				found2_flag = true;
				if (found1_flag) return true;
			}
		}
	}
	return false;
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
			this.string.substring(25, 30)		
		);
	}
	
	else if (this.div_count == 4) {
		_divisions = new Array(
			this.string.substring(0, 8),
			this.string.substring(8, 15),
			this.string.substring(15, 23),
			this.string.substring(23, 30)
		);
	}
	
	else if (this.div_count == 3) {
		_divisions = new Array(
			this.string.substring(0, 10),
			this.string.substring(10, 20),
			this.string.substring(20, 30)
		);
	}
	
	else if (this.div_count == 2) {
		_divisions = new Array(
			this.string.substring(0, 15),
			this.string.substring(15, 30)
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
}

DivisionList.getRandom = function(conference_count, division_count) {
	// take a list of all the teams that we have
	var team_string = DL_ENCODING_CHARS.substring(0, global_teams.length);
	
	// shuffle the list randomly
	for (var i = team_string.length - 1; i >= 1; i--) {
		var j = randomInt(i);
		
		team_string = team_string.swapChars(i, j);
	}
	
	return new DivisionList(team_string, conference_count, division_count);
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
var ga_timeout;
var global_polygons;
var global_markers;
var global_relocated_teams = new Array();

var conference_colors = new Array(new Array('#1B7EE0', '#0F4780', '#ADD6FF', '#899096', '#565A5E', '#C8D1DB'), new Array('#F5891D', '#944E07', '#FFD6AD'), new Array('#7EE01B', '#386907'));

function updateDivisionCount(div_count) {
	$('.div_button').removeClass('selected');
	$('#division_count_selector_' + div_count).addClass('selected');
	global_division_count = div_count;
	divisions = initDivisions();

	resetPolygons();
	updateScreenLayout();
	updateTableFormat(divisions);

	updateMap(divisions);
	updateTable(divisions);
	setBookmark(divisions.string);
}

function updateConferenceCount(conf_count) {
	$('.conf_button').removeClass('selected');
	$('#conf_count_selector_' + conf_count).addClass('selected');

	$('.div_button').removeClass('disabled').removeAttr('disabled');

	global_conference_count = conf_count;

	if (conf_count == 3) {
		$('#division_count_selector_4').addClass('disabled').attr('disabled', 'disabled');
		$('#division_count_selector_2').addClass('disabled').attr('disabled', 'disabled');

		if (global_division_count == 4 || global_division_count == 2) updateDivisionCount(6);
	} else if (conf_count == 2) {
		$('#division_count_selector_3').addClass('disabled').attr('disabled', 'disabled');

		if (global_division_count == 3) updateDivisionCount(6);
	}

	divisions = initDivisions();
	resetPolygons();
	updateScreenLayout();
	updateTableFormat(divisions);

	updateMap(divisions);
	updateTable(divisions);
	setBookmark(divisions.string);
}

function getDistanceWeight() {
	return $('#distance_weight_slider').slider("option", "value");
}

function getTimezoneWeight() {
	return $('#timezone_weight_slider').slider("option", "value");
}

function getRivalryWeight() {
	return $('#rivalry_weight_slider').slider("option", "value");
}

function getDivisionWeight() {
	return $('#division_weight_slider').slider("option", "value");
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
			title: team.city + ' ' + team.name,
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

function initialize(defaultString) {
	initData();
	//initMap();
	processBookmark();

	//updateCosts();

	ReactDOM.render(React.createElement(Divisionizer, { initConferences: '1', initDivisions: '4', teams: global_teams, cities: global_cities, initString: defaultString }), document.getElementById('container'));
	//updateTableFormat(divisions);
	//setBookmark(divisions.string);
}

function processBookmark() {
	if (location.hash) {
		var hash_pieces = location.hash.substring(1).split(':');
		global_conference_count = hash_pieces[0];
		global_division_count = hash_pieces[1];

		for (var i = 3; i < hash_pieces.length; i++) {
			var relocated_team = hash_pieces[i];
			var team_pieces = relocated_team.split('^');
			changeTeamCity(team_pieces[0], team_pieces[1]);
		}
	}
}

function initInterface() {
	$('#distance_weight_slider').slider({ max: 10, value: 5, change: updateCosts });
	$('#rivalry_weight_slider').slider({ max: 10, value: 5, change: updateCosts });
	$('#division_weight_slider').slider({ max: 10, value: 5, change: updateCosts });
	$('#timezone_weight_slider').slider({ max: 10, value: 5, change: updateCosts });

	$('#relocationizer').dialog({ autoOpen: false, modal: true, minHeight: 100, minWidth: 400 });

	var sorted_teams = global_teams.slice(0);
	sorted_teams.sort(function (a, b) {
		if (a.name < b.name) return -1;if (a.name > b.name) return 1;return 0;
	});
	for (var i = 0; i < sorted_teams.length; i++) {
		var index = global_teams.indexOf(sorted_teams[i]);
		$('#relocationizer_teams').append("<option value='" + index + "'>" + sorted_teams[i].name + "</option>");
	}
	for (i = 0; i < global_cities.length; i++) {
		$('#relocationizer_cities').append("<option value='" + i + "'>" + global_cities[i].city + "</option>");
	}

	updateDivisionCount(global_division_count);
	updateConferenceCount(global_conference_count);

	updateScreenLayout();
}

function openRelocationDialog() {
	$('#relocationizer').dialog('open');
}

function relocateTeam() {
	var team = $('#relocationizer_teams option:selected').attr('value');
	var city = $('#relocationizer_cities option:selected').attr('value');
	changeTeamCity(team, city);
}

function addMovedTeamRow(team, city_name) {
	removeMovedTeamRow(team);
	$('#relocated_teams').append('<div class="relocated_team" id="team' + team + '">Relocated <span class="old_team">' + global_teams[team].name + '</span> to <span class="new_city">' + city_name + '</span>&nbsp;<a href="javascript:revertTeamCity(' + team + ');">Undo</a></div>');
}

function removeMovedTeamRow(team) {
	$('#relocated_teams #team' + team).remove();
}

function initDivisions() {
	var div_string;

	if (location.hash) {
		var hash_pieces = location.hash.substring(1).split(':');
		div_string = hash_pieces[2];
	} else {
		div_string = DivisionList.getDefaultString();
	}

	return new DivisionList(div_string, global_conference_count, global_division_count);
}

function setBookmark(div_string) {
	div_string = global_conference_count + ':' + global_division_count + ':' + div_string;

	for (var i = 0; i < global_teams.length; i++) {
		if (global_relocated_teams[i]) {
			div_string += ':' + i + '^' + global_relocated_teams[i];
		}
	}

	location.hash = '#' + div_string;
	$('#fb_share').attr('href', "http://www.facebook.com/sharer/sharer.php?u=http://www.divisionizer.com/%23" + div_string);
	$('#tw_share').attr('href', "http://www.twitter.com/home?status=http://www.divisionizer.com/%23" + div_string);
}

function updateTableFormat(divisions) {
	$('#divisions').empty();

	var division_count = divisions.div_count;
	var conference_count = divisions.conf_count;
	var division_list = divisions.toArray();

	var divisions_per_conference = division_count / conference_count;
	for (var i = 0; i < conference_count; i++) {
		for (var j = 0; j < divisions_per_conference; j++) {
			$('#divisions').append('<div class="division column' + division_count + '" id="c' + i + 'd' + j + '"><div class="header">Division ' + (j + 1) + '<div class="legend" style="background:' + conference_colors[i][j] + '"></div></div></div>');
			var current_division = division_list[i][j];
			for (var k = 0; k < current_division.length; k++) {
				$('#c' + i + 'd' + j).append('<div class="team" id="c' + i + 'd' + j + 't' + k + '"></div>');
			}
		}
	}

	$('.team').draggable({ revert: true }).droppable({ drop: handleDrop, hoverClass: 'droppable' });
}

function updateTable(divisions) {
	//	$('#divisions .team').remove();

	var division_list = divisions.toArray();
	var divisions_per_conference = divisions.div_count / divisions.conf_count;
	for (var i = 0; i < divisions.conf_count; i++) {
		for (var j = 0; j < divisions_per_conference; j++) {
			var current_division = division_list[i][j];

			for (var k = 0; k < current_division.length; k++) {
				var team = current_division[k];
				$('#c' + i + 'd' + j + 't' + k).text(team.city + ' ' + team.name);
			}
		}
	}
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
	return 'logos/' + team.name.toLowerCase().replace(' ', '') + '.png';
}
function handleDrop(event, ui) {
	var divisions = initDivisions();
	var teams_per_conference = global_teams.length / divisions.conf_count;
	var teams_per_division = global_teams.length / divisions.div_count;

	var team1_id = $(this).attr('id');
	var team2_id = ui.draggable.attr('id');

	var team1_matches = team1_id.match(/\d+/g);
	var team1_offset = new Number(team1_matches[0]) * teams_per_conference + Math.ceil(new Number(team1_matches[1]) * teams_per_division) + new Number(team1_matches[2]);

	var team2_matches = team2_id.match(/\d+/g);
	var team2_offset = new Number(team2_matches[0]) * teams_per_conference + Math.ceil(new Number(team2_matches[1]) * teams_per_division) + new Number(team2_matches[2]);

	divisions.string = divisions.string.swapChars(team1_offset, team2_offset);
	delete divisions.conferences;

	ui.draggable.css('top', '0px').css('left', '0px');

	updateTable(divisions);
	updateMap(divisions);
	setBookmark(divisions.string);
}

function divisionize() {
	$('#divisionizer_on').show();
	$('#divisionizer_off').hide();

	$('.conf_button').addClass('disabled').attr('disabled', 'disabled');
	$('.div_button').addClass('disabled').attr('disabled', 'disabled');

	var population = new Array();
	continuing_flag = true;
	for (var i = 0; i < GA_GENERATION_SIZE; i++) {
		population.push(DivisionList.getRandom(global_conference_count, global_division_count));
	}

	gaIterate(population, GA_MAX_SURVIVORS);
}

function stop_divisionize() {
	$('.conf_button').removeClass('disabled').removeAttr('disabled');
	$('.div_button').addClass('disabled').attr('disabled', 'disabled');

	$('.div_button').removeClass('disabled').removeAttr('disabled');

	if (global_conference_count == 3) {
		$('#division_count_selector_4').addClass('disabled').attr('disabled', 'disabled');
		$('#division_count_selector_2').addClass('disabled').attr('disabled', 'disabled');
	} else if (global_conference_count == 2) {
		$('#division_count_selector_3').addClass('disabled').attr('disabled', 'disabled');
	}

	$('#divisionizer_on').hide();
	$('#divisionizer_off').show();
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
