var React = require("react");
var DragSource = require("react-dnd").DragSource;
var DragTypes = require("../global/dragtypes");
var Team = require("./team.model");
var TeamLogo = require("../global/teamlogo.jsx").component;

require("./_teamcard.scss");

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
		var source=this.props.team.getLogoID();

		var additionalClass = "";
		if (this.props.team.relocated) {
			additionalClass = " moved";
		}
		if (this.props.team.expansion) {
			additionalClass = " created";
		}

		return this.props.connectDragSource(
			<div className={"team" + additionalClass}>
				<TeamLogo className="team_logo" id={source} />
				<span className="team_city">{this.props.team.city}</span>
				<span className="team_name">&nbsp;{this.props.team.name}</span>
			</div>
		);
	}
});

module.exports = DragSource(DragTypes.TEAM, dragSpec, collect)(TeamCard);
