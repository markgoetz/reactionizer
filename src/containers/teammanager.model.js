var Team = require("../league/team.model");

var TeamManager = function(jsonTeams) {
	this.teams = jsonTeams.map(function(t) { return new Team(t); });

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
				city: city.city,
				lat: city.lat,
				lon: city.lon
			},
			true
		));
	};

	this.removeTeam = function(id) {
		this.teams.splice(id, 1);
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
};

module.exports = TeamManager;