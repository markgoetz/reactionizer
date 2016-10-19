var React = require("react");
var dragula = require("dragula");

var LeagueDisplay = React.createClass({
	propTypes: {
		league: React.PropTypes.array,
		onDrag: React.PropTypes.func
	},
	componentDidUpdate: function() {
		dragula(
			Array.prototype.slice.call(document.querySelectorAll(".division .list"))
		).on("drop", function(el, container) {
			this.props.onDrag(el.dataset.teamid, container.dataset.divid);
		}.bind(this));
	},
	render: function() {
		var nodes = this.props.league.map(function (conference,index) {
			return <Conference conference={conference} key={index} number={index} count={this.props.league.length} />;
		}, this);

		return <div id="league">{nodes}</div>;
	}
});	

var Conference = React.createClass({
	propTypes: {
		conference: React.PropTypes.array,
		count: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function() {
		var division_nodes = this.props.conference.map(function (division,index) {
			var id = this.props.number * this.props.conference.length + index + 1;

			return <Division division={division} key={index} count={this.props.conference.length*this.props.count} conference={this.props.number} number={index} id={id} />;
		}, this);

		var className = "conference col-" + this.props.count;
		return <div className={className}>{division_nodes}</div>;
	}
});

var Division = React.createClass({
	propTypes: {
		division: React.PropTypes.array,
		count: React.PropTypes.number,
		conference: React.PropTypes.number,
		number: React.PropTypes.number,
		id: React.PropTypes.number
	},
	render: function() {
		var team_nodes = this.props.division.map(function (team) {
			return <TeamCard team={team} key={team.name} />;
		});

		var className = "division col-" + this.props.count + " conf-" + this.props.conference + " div-" + this.props.number;
		return <div className={className}><div className="name">{this.props.division.name}</div><div className="list" data-divid={this.props.id}>{team_nodes}</div></div>;
	}
});

var TeamCard = React.createClass({
	propTypes: {
		team: React.PropTypes.object
	},
	render: function() {
		var source=this.props.team.getLogoURL();
		return (<div className="team" data-teamid={this.props.team.id}>
        <img className="team-logo" src={source} /><span className="city">{this.props.team.city}</span><span className="name">&nbsp;{this.props.team.name}</span>
      </div>);
	}
});

module.exports = LeagueDisplay;