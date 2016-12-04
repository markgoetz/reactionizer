var React = require("react");
var Division = require("./divisiondisplay");
require("./_conferencedisplay.scss");

var ConferenceDisplay = React.createClass({
	propTypes: {
		conference: React.PropTypes.array,
		count: React.PropTypes.number,
		number: React.PropTypes.number,
		onDrag: React.PropTypes.func
	},
	render: function() {
		var division_nodes = this.props.conference.map(function (division, index) {

			var id = this.props.number * this.props.conference.length + index;
			return <Division
				division={division}
				key={index}
				count={this.props.conference.length * this.props.count}
				conference={this.props.number}
				number={index}
				id={id}
				onDrag={this.onDrag}
			/>;

		}, this);

		var className = "conference col-" + this.props.count;
		return <div className={className}>{division_nodes}</div>;
	},
	onDrag: function(team_id, div_id) {
		this.props.onDrag(team_id, div_id);
	}
});

module.exports = ConferenceDisplay;
