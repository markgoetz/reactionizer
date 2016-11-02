var React = require("react");


var ChangeView = React.createClass({
	propTypes: {
		relocatedTeams: React.PropTypes.array,
		expansionTeams: React.PropTypes.array,
		onUndoRelocation: React.PropTypes.func.isRequired,
		onUndoExpansion: React.PropTypes.func.isRequred
	},
	getInitialState: function() {
		return {
			open: true
		};
	},
	render: function() {
		var change_count = this.props.relocatedTeams.count + this.props.expansionTeams.count;

		if (change_count == 0) {
			return <span></span>;
		}

		var relocated_nodes = [];
		var expansion_nodes = [];

		return <div className="changedTeams">
			<header>
				View Changes
				<div className="change_count">{change_count}</div>
				<button onClick={this.toggle}>+</button>
			</header>
			{relocated_nodes}
			{expansion_nodes}
		</div>;
	},
	toggle: function() {
		this.setState({open: !this.state.open});
	}
});

module.exports = ChangeView;