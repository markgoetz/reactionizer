var React = require("react");

var ConferenceDisplay = require("./conferencedisplay.jsx");

require("./_leaguedisplay.scss");

var LeagueDisplay = React.createClass({
	propTypes: {
		league: React.PropTypes.array,
		onDrag: React.PropTypes.func
	},
	render: function() {
		var nodes = this.props.league.map(function (conference,index) {
			return <ConferenceDisplay conference={conference} key={index} number={index} count={this.props.league.length} onDrag={this.onDrag} />;
		}, this);

		return <div className="league">{nodes}</div>;
	},
	onDrag: function(team_id, div_id) {
		this.props.onDrag(team_id, div_id);
	}
});

module.exports = LeagueDisplay;
