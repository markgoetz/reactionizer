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
		this.leaguemanager = new LeagueManager(teams, jsonDefaultLeagues);

		return {
			conference_count: this.props.initConferences,
			division_count: this.props.initDivisions,
			league: this.leaguemanager.getLeague(this.props.initConferences, this.props.initDivisions).toArray(),
			teams: teams,
			cities: jsonCities
		};
	},
	onRelocateTeam: function(teamid, cityid) {
		teamid--; cityid--;
		this.leaguemanager.relocateTeam(teamid, jsonCities[cityid]);

		this.setState({
			league: this._getLeague(),
		});
	},
	onAddTeam: function(name, cityid) {

		this.leaguemanager.addTeam(name, this.state.cities[cityid]);

		this.setState({
			league: this._getLeague(),
			teams: this.leaguemanager.getTeams()
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
	_getLeague: function(conf_count, division_count) {
		if (!conf_count) conf_count = this.state.conference_count;
		if (!division_count) division_count = this.state.division_count;

		return (this.leaguemanager.getLeague(conf_count, division_count)).toArray();
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