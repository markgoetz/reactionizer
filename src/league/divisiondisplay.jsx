var React = require("react");
var DropTarget = require("react-dnd").DropTarget;
var TeamCard = require("./teamcard");
var DragTypes = require("../global/dragtypes");

require("./_divisiondisplay.scss");

var spec = {
	drop: function(props, monitor, component) {
		var team = monitor.getItem().team;
		component.props.onDrag(team.id, props.id);
	}
};

var collect = function(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		canDrop: monitor.canDrop
	};
};

var DivisionDisplay = React.createClass({
	propTypes: {
		division: React.PropTypes.array,
		count: React.PropTypes.number,
		conference: React.PropTypes.number,
		number: React.PropTypes.number,
		id: React.PropTypes.number,
		onDrag: React.PropTypes.func,
		connectDropTarget: React.PropTypes.func,
		canDrop: React.PropTypes.func
	},
	render: function() {
		var team_nodes = this.props.division.map(function (team) {
			return <TeamCard team={team} key={team.name} />;
		});

		var className = "division col-" + this.props.count + " conf-" + this.props.conference + " div-" + this.props.number;
		return this.props.connectDropTarget(
			<div className={className}>
				<div className="name">{this.props.division.name}</div>
				<div className="list">
					{team_nodes}
				</div>
			</div>
		);
	}
});

module.exports = DropTarget(DragTypes.TEAM, spec, collect)(DivisionDisplay);
