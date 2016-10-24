var React = require("react");
var Sortable = require("sortablejs");
var TeamCard = require("./teamcard");

var DivisionDisplay = React.createClass({
	propTypes: {
		division: React.PropTypes.array,
		count: React.PropTypes.number,
		conference: React.PropTypes.number,
		number: React.PropTypes.number,
		id: React.PropTypes.number,
		onDrag: React.PropTypes.func
	},
	initializeDragRef: function(division) {
		if (division == null) return; // Called when an element is removed from the DOM; we don't need to do anything.

		Sortable.create(division, {
			group: "division",
			sort: true,
			onAdd: function(evt) {
				this.props.onDrag(evt.item.dataset.teamid, evt.from.dataset.divid);
				return false; // If you remove this, React will flip a shit because the Virtual DOM does not match up with the real DOM.
			}.bind(this),
			animation: 250,
			scroll: false
		});
	},
	render: function() {
		var team_nodes = this.props.division.map(function (team) {
			return <TeamCard team={team} key={team.name} />;
		});

		var className = "division col-" + this.props.count + " conf-" + this.props.conference + " div-" + this.props.number;
		return <div className={className}>
			<div className="name">{this.props.division.name}</div>
			<div className="list" data-divid={this.props.id} ref={this.initializeDragRef}>
				{team_nodes}
			</div>
		</div>;
	}
});

module.exports = DivisionDisplay;