var League = require("../league/league.model");

require("../global/getminvalueindex-polyfill");

var LeagueManager = function(defaultleaguestrings) {
	var _getInitLeagues = function(strings) {
		var leagues = [null, [], [], []];

		for (var c = 1; c < leagues.length; c++) {
			for (var div_count in strings) {
				if (div_count % c != 0) continue;

				var string = strings[div_count];
				leagues[c][div_count] = new League(string, c, div_count);
			}
		}

		return leagues;
	}.bind(this);

	this.defaultleagues = _getInitLeagues(defaultleaguestrings);


	this.getLeague = function(conferences, divisions) {
		return this.defaultleagues[conferences][divisions];
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