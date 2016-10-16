var getLogoURL;
var dragula;

var LeagueDisplay = React.createClass({
	displayName: "LeagueDisplay",

	propTypes: {
		league: React.PropTypes.array
	},
	componentDidUpdate: function () {
		dragula(Array.prototype.slice.call(document.querySelectorAll(".division .list"))).on("drop", function (el, container) {
			alert(el.className + " " + container.className);
		});
	},
	render: function () {
		var nodes = this.props.league.map(function (conference, index) {
			return React.createElement(Conference, { conference: conference, key: index, number: index, count: this.props.league.length });
		}, this);

		return React.createElement(
			"div",
			{ id: "league" },
			nodes
		);
	}
});

var Conference = React.createClass({
	displayName: "Conference",

	propTypes: {
		conference: React.PropTypes.array,
		count: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function () {
		var division_nodes = this.props.conference.map(function (division, index) {
			return React.createElement(Division, { division: division, key: index, count: this.props.conference.length * this.props.count, conference: this.props.number, number: index });
		}, this);

		var className = "conference col-" + this.props.count;
		return React.createElement(
			"div",
			{ className: className },
			division_nodes
		);
	}
});

var Division = React.createClass({
	displayName: "Division",

	propTypes: {
		division: React.PropTypes.array,
		count: React.PropTypes.number,
		conference: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function () {
		var team_nodes = this.props.division.map(function (team) {
			return React.createElement(Team, { team: team, key: team.name });
		});

		var className = "division col-" + this.props.count + " conf-" + this.props.conference + " div-" + this.props.number;
		return React.createElement(
			"div",
			{ className: className },
			React.createElement(
				"div",
				{ className: "name" },
				this.props.division.name
			),
			React.createElement(
				"div",
				{ className: "list" },
				team_nodes
			)
		);
	}
});

var Team = React.createClass({
	displayName: "Team",

	propTypes: {
		team: React.PropTypes.object
	},
	render: function () {
		var source = getLogoURL(this.props.team);
		return React.createElement(
			"div",
			{ className: "team" },
			React.createElement("img", { className: "team-logo", src: source }),
			React.createElement(
				"span",
				{ className: "city" },
				this.props.team.city
			),
			React.createElement(
				"span",
				{ className: "name" },
				" ",
				this.props.team.name
			)
		);
	}
});
//# sourceMappingURL=leaguedisplay.js.map
