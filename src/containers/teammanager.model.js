var Team = require("../league/team.model");

var TeamManager = function(jsonTeams) {
	this.teams = jsonTeams.map(function(t, index) {
		t.id = index;
		return new Team(t);
	});

	this.relocateTeam = function(teamid, city) {
		this.teams[teamid].relocate(city);
	};

	this.resetTeam = function(teamid) {
		this.teams[teamid].reset();
	};

	this.addTeam = function(name, city) {
		this.teams.push(new Team(
			{
				name: name,
				id: this.teams.length,
				cityid: city.id,
				city: city.city,
				lat: city.lat,
				lon: city.lon
			},
			true
		));
	};

	this.removeTeam = function(id) {
		this.teams.splice(id, 1);

		for (var i = 0; i < this.teams.length; i++) {
			this.teams[i].id = i;
		}
	};

	this.getRelocatedTeams = function() {
		return this.teams.filter(
			function(t) { return t.relocated; }
		);
	};

	this.getExpansionTeams = function() {
		return this.teams.filter(
			function(t) { return t.expansion; }
		);
	};

	this.getTeamCount = function() {
		return this.teams.length;
	};
};

module.exports = TeamManager;
