require("../global/setcharat-polyfill");

function LeagueModel(league, conference_count, division_count) {
	this.div_count = division_count;
	this.conf_count = conference_count;
	this.div_string = league.string;
	this.div_names = league.names;

	this.addTeam = function(div_number) {
		this.div_string = this.div_string + div_number + "";
	};

	this.removeTeam = function(index) {
		this.div_string = this.div_string.setCharAt(index, "");
	};

	this.setTeamDivision = function(team_id, div_number) {
		if (team_id < 0 || team_id > this.div_string.length) return;
		if (div_number < 0 || div_number > division_count) return;

		this.div_string = this.div_string.setCharAt(team_id, div_number);
	};

	this.getDivisionCounts = function() {
		var div_counts = [];

		for (var d = 0; d < this.div_count; d++) {
			div_counts.push(0);
		}

		for (var i = 0; i < this.div_string.length; i++) {
			div_counts[this.div_string[i] - 1]++;
		}
		return div_counts;
	};

	this.toArray = function() {
		var league_array = [];
		var div_init_number = 0;

		for (var c = 0; c < this.conf_count; c++) {
			league_array.push([]);

			for (var d = 0; d < this.div_count / this.conf_count; d++) {
				var a = [];
				a.name = this.div_names[div_init_number];
				league_array[c].push(a);
				div_init_number++;
			}
		}

		for (var team_id = 0; team_id < this.div_string.length; team_id++) {
			var total_div_number = this.div_string[team_id] - 1;

			var divs_per_conference = this.div_count / this.conf_count;

			var c2 = Math.floor(total_div_number / divs_per_conference);

			league_array[c2][total_div_number % divs_per_conference].push(team_id);
		}

		return league_array;
	};
}

module.exports = LeagueModel;