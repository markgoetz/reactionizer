var React = require("react");
var League = require("../league/league.model");
var Team = require("../league/team.model");

var DragDropContext = require("react-dnd").DragDropContext;
var DnDBackend = require("react-dnd-html5-backend");

var Divisionizer = require("./divisionizer");

require("../global/setcharat-polyfill");

var jsonTeams = require("../data/teams.json");
var jsonCities = require("../data/cities.json");
var jsonDefaultLeagues = require("../data/defaultleagues.json");

var DivisionizerController = React.createClass({
	propTypes: {
		initConferences: React.PropTypes.number,
		initDivisions: React.PropTypes.number
	},
	getInitialState: function() {
		var teams = jsonTeams.map(function(t) { return new Team(t); });

		return {
			conference_count: this.props.initConferences,
			division_count: this.props.initDivisions,
			league: this._getLeague(this.props.initConferences, this.props.initDivisions, jsonDefaultLeagues, teams),
			defaultleagues: jsonDefaultLeagues,
			teams: teams,
			cities: jsonCities,
			max_id: jsonTeams.length + 1
		};
	},
	onRelocateTeam: function(teamid, cityid) {
		teamid--; cityid--;

		var teams = this.state.teams;
		var team = teams[teamid];
		team.relocate(this.state.cities[cityid]);

		teams[teamid] = team;

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.state.defaultleagues, teams),
			teams: teams
		});
	},
	onAddTeam: function(name, cityid) {
		var city = this.state.cities[cityid];
		var team = new Team({
			id: this.state.max_id++,
			name: name,
			city: city.name,
			lat: city.lat,
			lon: city.lon
		});

		var teams = this.state.teams;
		teams.push(team);

		//TODO: Update the default division strings.


		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.state.defaultleagues, teams),
			teams: teams
		});
	},
	onConferenceChange: function(c, d) {
		this.setState({
			conference_count: c,
			division_count: d,
			league: this._getLeague(c, d, this.state.defaultleagues, this.state.teams)
		});
	},
	onDrag: function(team, division) {
		var defaultleagues = this.state.defaultleagues;

		var div_string = defaultleagues[this.state.division_count].string;
		div_string = div_string.setCharAt(team-1, division.toString());

		defaultleagues[this.state.division_count].string = div_string;

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, defaultleagues, this.state.teams),
			defaultleagues: defaultleagues
		});
	},
	_getLeague: function(conf_count, div_count, defaultleagues, teams) {
		var league_string = defaultleagues[div_count];

		if (league_string) {
			var league = new League(league_string, conf_count, div_count, teams);
			return league.toArray();
		}
		else {
			return [];
		}
	},
	render: function() {
		return (<Divisionizer
			conferences={this.state.conference_count}
			divisions={this.state.division_count}
			teams={this.state.teams}
			cities={this.state.cities}
			league={this.state.league}
			onRelocate={this.onRelocateTeam}
			onExpansion={this.onAddTeam}
			onConferenceChange={this.onConferenceChange}
			onDrag={this.onDrag} />
		);
	}
});

module.exports = DragDropContext(DnDBackend)(DivisionizerController);