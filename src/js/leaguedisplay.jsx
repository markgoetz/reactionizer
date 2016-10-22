var React = require("react");
var dragula = require("dragula");

var ConferenceDisplay = require("./conferencedisplay.jsx");

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
			return <ConferenceDisplay conference={conference} key={index} number={index} count={this.props.league.length} />;
		}, this);

		return <div id="league">{nodes}</div>;
	}
});	

module.exports = LeagueDisplay;