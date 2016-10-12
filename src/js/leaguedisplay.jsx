var getLogoURL;
var dragula;

var LeagueDisplay = React.createClass({
	propTypes: {
		league: React.PropTypes.array
	},
	componentDidMount: function() {
		dragula(
			Array.prototype.slice.call(
				ReactDOM.findDOMNode(this).querySelectorAll(".division .list")
			)
		).on("drop", function(el, container) {
			alert(el.className + " " + container.className);
		});
	},
	render: function() {
		var nodes = this.props.league.map(function (conference,index) {
			return <Conference conference={conference} key={index} number={index} count={this.props.league.length} />;
		}, this);

		return <div id="league">{nodes}</div>;
	}
});	

var Conference = React.createClass({
	propTypes: {
		conference: React.PropTypes.array,
		count: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function() {
		var division_nodes = this.props.conference.map(function (division,index) {
			return <Division division={division} key={index} count={this.props.conference.length*this.props.count} conference={this.props.number} number={index} />;
		}, this);

		var className = "conference col-" + this.props.count;
		return <div className={className}>{division_nodes}</div>;
	}
});

var Division = React.createClass({
	propTypes: {
		division: React.PropTypes.array,
		count: React.PropTypes.number,
		conference: React.PropTypes.number,
		number: React.PropTypes.number
	},
	render: function() {
		var team_nodes = this.props.division.map(function (team) {
			return <Team team={team} key={team.name} />;
		});

		var className = "division col-" + this.props.count + " conf-" + this.props.conference + " div-" + this.props.number;
		return <div className={className}><div className="name">Name</div><div className="list">{team_nodes}</div></div>;
	}
});

var Team = React.createClass({
	propTypes: {
		team: React.PropTypes.object
	},
	render: function() {
		var source=getLogoURL(this.props.team);
		return (<div className="team">
        <img className="team-logo" src={source} /><span className="city">{this.props.team.city}</span><span className="name">&nbsp;{this.props.team.name}</span>
      </div>);
	}
});