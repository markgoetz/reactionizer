var React = require("react");
require("./_relocationizer.scss");

var Relocationizer = React.createClass({
	propTypes: {
		teams: React.PropTypes.array,
		cities: React.PropTypes.array,
		onRelocate: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			relocate_team: 1,
			relocate_city: 1,
			expansion_name: "",
			expansion_city: 1
		};
	},
	render: function() {
		var team_nodes = this.props.teams.map(function(team) {
			return <option key={team.id} value={team.id}>{team.name}</option>;
		});

		var city_nodes = this.props.cities.map(function(city) {
			return <option key={city.id} value={city.id}>{city.city}</option>;
		});

		return <div>
			<div className="field">
				<h3>Relocate team</h3>
				<div className="subfield"><label>team</label><select value={this.state.relocate_team} onChange={this.handleRelocateTeamSelect}>{team_nodes}</select></div>
				<div className="subfield"><label>to</label><select value={this.state.relocate_city} onChange={this.handleRelocateCitySelect}>{city_nodes}</select></div>
				<div><button className="action" onClick={this.relocate}>Relocate Team</button></div>
			</div>

			<div className="field">
				<h3>Expansion team</h3>
				<div className="subfield"><label>city</label><select value={this.state.expansion_city} onChange={this.handleExpansionCitySelect}>{city_nodes}</select></div>
				<div className="subfield"><label>name</label><input type="text" value={this.state.expansion_name} onChange={this.handleExpansionCityName} /></div>
				<div><button className="action">Create Team</button></div>
			</div>
		</div>;
	},
	relocate: function() {
		this.props.onRelocate(this.state.relocate_team, this.state.relocate_city);
	},
	handleExpansionCityName: function(event) {
		this.setState({expansion_name: event.target.value});
	},
	handleExpansionCitySelect: function(event) {
		this.setState({expansion_city: event.target.value});
	},
	handleRelocateCitySelect: function(event) {
		this.setState({relocate_city: event.target.value});
	},
	handleRelocateTeamSelect: function(event) {
		this.setState({relocate_team: event.target.value});
	}
});

module.exports = Relocationizer;