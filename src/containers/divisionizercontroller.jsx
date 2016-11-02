var React = require("react");
var LeagueManager = require("../containers/leaguemanager.model");
var Team = require("../league/team.model");

var DragDropContext = require("react-dnd").DragDropContext;
var DnDBackend = require("react-dnd-html5-backend");

var Divisionizer = require("./divisionizer");

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
		this.leaguemanager = new LeagueManager(jsonDefaultLeagues);

		return {
			conference_count: this.props.initConferences,
			division_count: this.props.initDivisions,
			league: this._getLeague(this.props.initConferences, this.props.initDivisions, teams),
			teams: teams,
			cities: jsonCities
		};
	},
	onRelocateTeam: function(teamid, cityid) {
		this.state.teams[teamid].relocate(jsonCities[cityid]);

		var teams = this.state.teams;
		var team = teams[teamid];
		team.relocate(jsonCities[cityid]);
		teams[teamid] = team;

		this.setState({
			teams: teams,
			league: this._getLeague(null, null, teams),
		});
	},
	onAddTeam: function(name, cityid) {
		var city = jsonCities[cityid];
		var team = new Team(
			{
				name: name,
				city: city.city,
				lat: city.lat,
				lon: city.lon
			},
			true
		);
		var teams = this.state.teams;
		teams.push(team);

		this.leaguemanager.addTeam();

		this.setState({
			league: this._getLeague(null, null, teams),
			teams: teams
		});
	},
	onConferenceChange: function(c, d) {
		this.setState({
			conference_count: c,
			division_count: d,
			league: this._getLeague(c, d)
		});
	},
	onDrag: function(team, division) {
		this.leaguemanager.changeTeamDivision(team, division, this.state.division_count);

		this.setState({
			league: this._getLeague()
		});
	},
	_getLeague: function(conf_count, division_count, teams) { // The optional parameters are a hack to fix scenarios where you have to call React.setState() on both the league and the division/conference count.
		if (!conf_count) conf_count = this.state.conference_count;
		if (!division_count) division_count = this.state.division_count;

		return this._leagueToArray(this.leaguemanager.getLeague(conf_count, division_count), teams);
	},
	_leagueToArray: function(league, teams) {
		if (!teams) teams = this.state.teams;

		var league_array = league.toArray();

		for (var c = 0; c < league_array.length; c++) {
			for (var d = 0; d < league_array[c].length; d++) {
				for (var t = 0; t < league_array[c][d].length; t++) {
					var team_id = league_array[c][d][t];
					league_array[c][d][t] = teams[team_id];
				}
			}
		}
		
		return league_array;
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