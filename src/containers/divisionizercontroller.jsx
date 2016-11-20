var React = require("react");
var LeagueManager = require("../containers/leaguemanager.model");
var TeamManager = require("../containers/teammanager.model");

var DragDropContext = require("react-dnd").DragDropContext;
var DnDBackend = require("react-dnd-html5-touch-backend");
var Serializer = require("./serializer");
var QueryString = require("./querystring");

var Divisionizer = require("./divisionizer");

var jsonTeams = require("../data/teams.json");
var jsonCities = require("../data/cities.json");
var jsonDefaultLeagues = require("../data/defaultleagues.json");

var DivisionizerController = React.createClass({
	propTypes: {
		initConferences: React.PropTypes.number,
		initDivisions: React.PropTypes.number
	},

	parseQueryString: function() {
		var data = this.serializer.deserialize(this.querystring.get());

		if (data.conferences)
			this.initConferences = data.conferences;

		if (data.divisions)
			this.initDivisions = data.divisions;

		if (data.league)
			this.leaguemanager.setString(data.league, this.initDivisions);

		if (data.relocations) {
			data.relocations.forEach(function (t) {
				this.teammanager.relocateTeam(t.id, jsonCities[t.city]);
			}, this);
		}

		if (data.expansions) {
			data.expansions.forEach(function (t) {
				this.teammanager.addTeam(t.name, jsonCities[t.city]);
			}, this);
		}
	},

	getInitialState: function() {
		this.teammanager = new TeamManager(jsonTeams);
		this.leaguemanager = new LeagueManager(jsonDefaultLeagues);
		this.querystring = new QueryString();
		this.serializer = new Serializer();

		this.initConferences = this.props.initConferences;
		this.initDivisions = this.props.initDivisions;

		this.parseQueryString();

		return {
			conference_count: this.initConferences,
			division_count: this.initDivisions,
			league: this._getLeague(this.initConferences, this.initDivisions),
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
		this._updateLeague(c, d);
	},

	onDrag: function(team, division) {
		this.leaguemanager.changeTeamDivision(team, division, this.state.division_count);
		this._updateLeague();
	},

	// The optional parameters are a hack to fix scenarios where you have to call React.setState() on both the league and the division/conference count.
	_getLeague: function(conf_count, division_count, teams) {
		if (!conf_count) conf_count = this.state.conference_count;
		if (!division_count) division_count = this.state.division_count;

		return this._leagueToArray(this.leaguemanager.getLeague(conf_count, division_count), teams);
	},

	_updateLeague: function(conf_count, division_count) {
		if (!conf_count) conf_count = this.state.conference_count;
		if (!division_count) division_count = this.state.division_count;

		var teams = this.teammanager.teams;

		var query_string = this.serializer.serialize(
			conf_count,
			division_count,
			this.leaguemanager.getLeague(conf_count, division_count).getString(),
			this.teammanager.getRelocatedTeams(),
			this.teammanager.getExpansionTeams()
		);

		this.querystring.set(query_string);

		this.setState({
			conference_count: conf_count,
			division_count: division_count,
			league: this._getLeague(conf_count, division_count, teams),
			teams: teams,
			query_string: query_string
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
			onDrag={this.onDrag}
			queryString={this.state.querystring} />;
	}
});

module.exports = DragDropContext(DnDBackend)(DivisionizerController);