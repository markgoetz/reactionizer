var React = require("react");
var Team = require("./team.class");

var TeamCard = React.createClass({
	propTypes: {
		team: React.PropTypes.object
	},
	render: function() {
		var source=this.props.team.getLogoURL();
		return (<div className="team" data-teamid={this.props.team.id}>
        <img className="team-logo" src={source} /><span className="city">{this.props.team.city}</span><span className="name">&nbsp;{this.props.team.name}</span>
      </div>);
	}
});

module.exports = TeamCard;