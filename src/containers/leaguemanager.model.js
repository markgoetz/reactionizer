var League = require("../league/league.model");

require("../global/getminvalueindex-polyfill");

var LeagueManager = function(defaultleagues) {
	var _getInitLeagues = function(init_leagues) {
		var leagues = [null, [], [], []];

		for (var c = 1; c < leagues.length; c++) {
			for (var div_count in init_leagues) {
				if (div_count % c != 0) continue;

				var init_league = init_leagues[div_count];
				leagues[c][div_count] = new League(init_league, c, div_count);
			}
		}

		return leagues;
	};

	this.defaultleagues = _getInitLeagues(defaultleagues);


	this.getLeague = function(conferences, divisions) {
		return this.defaultleagues[conferences][divisions];
	};

	this.getStrings = function() {
		var leagues = [];

		for (var c = 1; c < this.defaultleagues.length; c++) {
			for (var d = 1; d < this.defaultleagues[c].length; d++) {
				if (!this.defaultleagues[c][d]) continue;				

				leagues[d] = this.defaultleagues[c][d].getString();
			}
		}		

		return leagues;
	};

	this.setString = function(string, div_count) {
		for (var c = 1; c <= 3; c++) {
			if (!this.defaultleagues[c][div_count]) continue;

			this.defaultleagues[c][div_count].setString(string);
		}
	};
	
	this.addTeam = function() {
		// Put the new team in the division with the lowest number of teams.
		for (var c = 1; c <= 3; c++) {
			for (var d = 1; d < this.defaultleagues[c].length; d++) {
				if (!this.defaultleagues[c][d]) continue;

				var team_counts = this.defaultleagues[c][d].getDivisionCounts();
				this.defaultleagues[c][d].addTeam(team_counts.getMinValueIndex() + 1);
			}
		}
	};

	this.removeTeam = function(id) {
		for (var c = 1; c <= 3; c++) {
			for (var d = 1; d < this.defaultleagues[c].length; d++) {
				if (!this.defaultleagues[c][d]) continue;
				this.defaultleagues[c][d].removeTeam(id);
			}
		}
	};

	this.changeTeamDivision = function(team, division, division_count) {
		for (var c = 1; c <= 3; c++) {
			if (!this.defaultleagues[c][division_count]) continue;

			this.defaultleagues[c][division_count].setTeamDivision(team, division);
		}
	};
};

module.exports = LeagueManager;