require("../global/setcharat-polyfill");

function LeagueModel(league, conference_count, division_count, all_teams) {
	this.all_teams = all_teams;
	this.div_count = division_count;
	this.conf_count = conference_count;
	this.div_string = league.string;
	this.div_names = league.names;
	var _divisions;

	var _setDivisions = function() {
		_divisions = [];

		var t = 0;
		for (var c = 0; c < this.conf_count; c++) {
			_divisions.push([]);
			for (var d = 0; d < this.div_count / this.conf_count; d++) {
				var a = new Array();
				a.name = this.div_names[t];
				_divisions[c].push(a);
				t++;
			}
		}

		for (var i = 0; i < this.all_teams.length; i++) {
			var div_string_elem = this.div_string[i] - 1;
			var divs_per_conference = this.div_count / this.conf_count;


			var conference = Math.floor(div_string_elem / divs_per_conference);
			var division = div_string_elem % divs_per_conference;

			_divisions[conference][division].push(this.all_teams[i]);
		}
	}.bind(this);

	_setDivisions();

	this.toArray = function() {
		return _divisions;
	};

	this.addTeam = function(team, div_number) {
		this.div_string = this.div_string + div_number + "";
		this.all_teams.push(team);
		_setDivisions();
	};

	this.setTeamDivision = function(team_id, div_number) {
		if (team_id < 1 || team_id > all_teams.length + 1) return;
		if (div_number < 0 || div_number > division_count) return;

		this.div_string = this.div_string.setCharAt(team_id - 1, div_number);
		_setDivisions();
	};

	this.getDivisionCounts = function() {
		var div_counts = [];
		for (var i = 0; i < this.div_string.length; i++) {
			div_counts[this.div_string[i]]++;
		}
		return div_counts;
	};

	this.setTeams = function(teams) {
		this.all_teams = teams;
	};
}

module.exports = LeagueModel;