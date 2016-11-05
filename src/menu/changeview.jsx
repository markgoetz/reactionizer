var React = require("react");
var ChangedTeamView = require("./changedteamview");

require("./_changeview.scss");

var ChangeView = React.createClass({
	propTypes: {
		relocatedTeams: React.PropTypes.array,
		expansionTeams: React.PropTypes.array,
		onUndoRelocation: React.PropTypes.func.isRequired,
		onUndoExpansion: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {
			open: false
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
		var button_label = this.state.open ? "close" : "open";

		var change_count_indicator = (change_count > 0) ? <span className="change_count">{change_count}</span> : "";

		return <div className="changed_teams">
			<h3>
				<span>Changes</span>
				{change_count_indicator}
				<div className="button_container"><button onClick={this.toggle} disabled={change_count == 0}>{button_label}</button></div>
			</h3>

			<div id="changelist" className={class_name}>
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