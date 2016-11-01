var League = require("../league/league.model");
var Team = require("../league/team.model");

require("../global/getminvalueindex-polyfill");

var LeagueManager = function(teams, defaultleaguestrings) {
	var _getInitLeagues = function(strings) {
		var leagues = [null, [], [], []];

		for (var c = 1; c < leagues.length; c++) {
			for (var div_count in strings) {
				if (div_count % c != 0) continue;

				var string = strings[div_count];
				leagues[c][div_count] = new League(string, c, div_count, teams);
			}
		}

		return leagues;
	}.bind(this);

	var _updateAllTeams = function(teams) {
		for (var c = 1; c < 3; c++) {
			for (var d = 1; d < this.defaultleagues[c].length; d++) {
				if (!this.defaultleagues[c][d]) continue;

				this.defaultleagues[c][d].setTeams(teams);
			}
		}
	}.bind(this);

	this.defaultleagues = _getInitLeagues(defaultleaguestrings);
	this.teams = teams;
	this.max_id = teams.length + 1;

	this.getLeague = function(conferences, divisions) {
		return this.defaultleagues[conferences][divisions];
	};
	
	this.addTeam = function(name, city) {
		var team = new Team({
			name: name,
			id: this.max_id++,
			city: city.city,
			lat: city.lat,
			lon: city.lon
		});

		this.teams.push(team);

		// Put the new team in the team with the lowest number of teams.
		for (var c = 1; c < 3; c++) {
			for (var d = 1; d < this.defaultleagues[c].length; d++) {
				if (!this.defaultleagues[c][d]) continue;

				var team_counts = this.defaultleagues[c][d].getDivisionCounts();
				this.defaultleagues[c][d].addTeam(team, team_counts.getMinValueIndex());
			}
		}
	};

	this.relocateTeam = function(team_id, city) {
		var team = teams[team_id];
		team.relocate(city);
		teams[team_id] = team;

		_updateAllTeams(teams);
	};

	this.changeTeamDivision = function(team, division, division_count) {
		for (var c = 1; c < 3; c++) {
			if (!this.defaultleagues[c][division_count]) continue;

			this.defaultleagues[c][division_count].setTeamDivision(team, division);
		}
	};
};

module.exports = LeagueManager;