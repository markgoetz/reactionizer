var React = require("react");
var DragSource = require("react-dnd").DragSource;
var DragTypes = require("../global/dragtypes");
var Team = require("./team.model");

var dragSpec = {
	beginDrag: function(props) {
		return { team: props.team };
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

var TeamCard = React.createClass({
	propTypes: {
		team: React.PropTypes.instanceOf(Team),
		isDragging: React.PropTypes.bool.isRequired,
		connectDragSource: React.PropTypes.func.isRequired
	},
	render: function() {
		var source=this.props.team.getLogoURL();
		return this.props.connectDragSource(
			<div className="team">
				<img className="team-logo" src={source} /><span className="city">{this.props.team.city}</span><span className="name">&nbsp;{this.props.team.name}</span>
			</div>
		);
	}
});

module.exports = DragSource(DragTypes.TEAM, dragSpec, collect)(TeamCard);