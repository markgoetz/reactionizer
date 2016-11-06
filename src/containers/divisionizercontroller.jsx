var React = require("react");
var LeagueManager = require("../containers/leaguemanager.model");
var TeamManager = require("../containers/teammanager.model");

var DragDropContext = require("react-dnd").DragDropContext;
var DnDBackend = require("react-dnd-html5-backend");
var URLController = require("./urlcontroller");

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
		this.teammanager = new TeamManager(jsonTeams);
		this.leaguemanager = new LeagueManager(jsonDefaultLeagues);
		this.urlcontroller = new URLController();

		return {
			conference_count: this.props.initConferences,
			division_count: this.props.initDivisions,
			league: this._getLeague(this.props.initConferences, this.props.initDivisions),
			cities: jsonCities
		};
	},

	onRelocateTeam: function(teamid, cityid) {
		this.teammanager.relocateTeam(teamid, jsonCities[cityid]);
		this._updateLeague();
	},

	onUndoRelocate: function(teamid) {
		this.teammanager.resetTeam(teamid);
		this._updateLeague();
	},

	onAddTeam: function(name, cityid) {
		this.teammanager.addTeam(name, jsonCities[cityid]);
		this.leaguemanager.addTeam();
		this._updateLeague();
	},

	onUndoExpansion: function(teamid) {
		this.leaguemanager.removeTeam(teamid);
		this.teammanager.removeTeam(teamid);
		this._updateLeague();
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
		this._updateLeague();
	},

	_getLeague: function(conf_count, division_count, teams) { // The optional parameters are a hack to fix scenarios where you have to call React.setState() on both the league and the division/conference count.
		if (!conf_count) conf_count = this.state.conference_count;
		if (!division_count) division_count = this.state.division_count;

		return this._leagueToArray(this.leaguemanager.getLeague(conf_count, division_count), teams);
	},

	_updateLeague: function() {
		var teams = this.teammanager.teams;

		this.setState({
			league: this._getLeague(null, null, teams),
			teams: teams
		});

		this.urlcontroller.update({
			leagues: this.leaguemanager.getStrings(),
			relocations: this.teammanager.getRelocatedTeams(),
			expansions: this.teammanager.getExpansionTeams()
		});
	},

	_leagueToArray: function(league, teams) {
		if (!teams) teams = this.teammanager.teams;

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
		return <Divisionizer
			conferences={this.state.conference_count}
			divisions={this.state.division_count}
			teams={this.teammanager.teams}
			cities={this.state.cities}
			league={this.state.league}
			relocatedTeams={this.teammanager.getRelocatedTeams()}
			expansionTeams={this.teammanager.getExpansionTeams()}
			onRelocate={this.onRelocateTeam}
			onExpansion={this.onAddTeam}
			onUndoRelocation={this.onUndoRelocate}
			onUndoExpansion={this.onUndoExpansion}
			onConferenceChange={this.onConferenceChange}
			onDrag={this.onDrag} />;
	}
});

module.exports = DragDropContext(DnDBackend)(DivisionizerController);