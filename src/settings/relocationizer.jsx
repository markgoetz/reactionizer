var React = require("react");
require("./_relocationizer.scss");

var Relocationizer = React.createClass({
	propTypes: {
		teams: React.PropTypes.array,
		cities: React.PropTypes.array,
		onRelocate: React.PropTypes.func
	},
	render: function() {
		var team_nodes = this.props.teams.map(function(team) {
			return <option key={team.name}>{team.name}</option>;
		});

		var city_nodes = this.props.cities.map(function(city) {
			return <option key={city.city}>{city.city}</option>;
		});

		return <div>
			<div className="field">
				<h3>Relocate team</h3>
				<div className="subfield"><label>team</label><select>{team_nodes}</select></div>
				<div className="subfield"><label>to</label><select>{city_nodes}</select></div>
				<div><button className="action" onClick={this.relocate}>Relocate Team</button></div>
			</div>

			<div className="field">
				<h3>Expansion team</h3>
				<div className="subfield"><label>city</label><select>{city_nodes}</select></div>
				<div className="subfield"><label>name</label><input type="text" /></div>
				<div><button className="action">Create Team</button></div>
			</div>
		</div>;
	},
	relocate: function() {
		
	}
});

module.exports = Relocationizer;