var React = require("react");
var ChangedTeamView = require("./changedteamview");

var ChangeView = React.createClass({
	propTypes: {
		relocatedTeams: React.PropTypes.array,
		expansionTeams: React.PropTypes.array,
		onUndoRelocation: React.PropTypes.func.isRequired,
		onUndoExpansion: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {
			open: true
		};
	},
	render: function() {
		var change_count = this.props.relocatedTeams.length + this.props.expansionTeams.length;

		var relocated_nodes = this.props.relocatedTeams.map(function(team) {
			return <ChangedTeamView key={team.id} team={team} onClick={this.props.onUndoRelocation} type={"relocation"} />;
		}, this);

		var expansion_nodes = this.props.expansionTeams.map(function(team) {
			return <ChangedTeamView key={team.id} team={team} onClick={this.props.onUndoExpansion} type={"expansion"} />;
		}, this);

		var class_name = this.state.open ? "open" : "closed";

		return <div className="changed_teams">
			<header>
				View Changes
				<div className="change_count">{change_count}</div>
			</header>
			<div className={class_name}>
				{relocated_nodes}
				{expansion_nodes}
			</div>
		</div>;
	},
	toggle: function() {
		this.setState({open: !this.state.open});
	}
});

module.exports = ChangeView;