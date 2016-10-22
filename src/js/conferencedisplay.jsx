var React = require("react");
var Division = require("./divisiondisplay");

var ConferenceDisplay = React.createClass({
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

module.exports = ConferenceDisplay;