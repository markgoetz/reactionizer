var React = require("react");
var Team = require("../league/team.model.js");

var ChangedTeamView = React.createClass({
	propTypes: {
		type: React.PropTypes.string.isRequired,
		team: React.PropTypes.instanceOf(Team),
		onClick: React.PropTypes.func.isRequired
	},
	render: function() {
		return <div key={this.props.team.id}>
			{this._getMessage()}
			<button onClick={this.handleClick}>Undo</button>
		</div>;
	},
	handleClick: function() {
		this.props.onClick(this.props.team.id);
	},
	_getMessage: function() {
		var team = this.props.team;

		if (this.props.type == "relocation") {
			return "Relocated " + team.name + " to " + team.city;
		}
		else if (this.props.type == "expansion") {
			return "Created " + team.city + " " + team.name;
		}
	}
});

module.exports = ChangedTeamView;