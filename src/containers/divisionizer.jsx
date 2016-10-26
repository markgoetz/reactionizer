var React = require("react");
require("whatwg-fetch");
var DivisionList = require("../league/division.model");
var Team = require("../league/team.model");

var DragDropContext = require("react-dnd").DragDropContext;
var DnDBackend = require("react-dnd-html5-backend");

require("./_divisionizer.scss");

var Header = require("./header");
var Footer = require("./footer");
var SettingsMenu = require("../settings/settingsmenu");
var Map = require("../map/map");
var LeagueDisplay = require("../league/leaguedisplay");

require("../global/setcharat-polyfill");



var Divisionizer = React.createClass({
	propTypes: {
		initConferences: React.PropTypes.number,
		initDivisions: React.PropTypes.number,
		dataurl: React.PropTypes.string
	},
	componentDidMount: function() {
		window.fetch(this.props.dataurl).then(
			function(response) {
				return response.json();
			}
		).then(
			function(json) {
				var teams = json.teams.map(function(t) { return new Team(t); });
				var cities = json.cities;
				var defaultdivs = json.defaultdivs;

				this.setState({
					teams: teams,
					cities: cities,
					defaultdivs: defaultdivs,
					league: this._getLeague(this.props.initConferences, this.props.initDivisions, defaultdivs, teams),
					max_id: teams.length + 1
				});
			}.bind(this)
		);
	},
	getInitialState: function() {
		return {
			conference_count:this.props.initConferences,
			division_count:this.props.initDivisions,
			league:[],
			defaultdivs:[],
			teams:[],
			cities:[],
			max_id: 0
		};
	},
	onRelocateTeam: function(teamid, cityid) {
		var teams = this.state.teams;
		var team = teams[teamid];
		var city = this.state.cities[cityid];

		team.cityname = city.state;
		team.lat = city.lat;
		team.lon = city.lon;

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.state.defaultdivs, teams),
			teams: teams
		});
		this._getDivisions();
	},
	onAddTeam: function(name, cityid) {
		var city = this.state.cities[cityid];
		var team = {
			id: this.state.max_id++,
			name: name,
			city: city.name,
			lat: city.lat,
			lon: city.lon
		};

		var teams = this.state.teams;
		teams.push(team);

		//TODO: Update the default division strings.

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.state.defaultdivs, teams),
			teams: teams
		});
	},
	onConferenceChange: function(c, d) {
		this.setState({
			conference_count: c,
			division_count: d,
			league: this._getLeague(c, d, this.state.defaultdivs, this.state.teams)
		});
	},
	onDrag: function(team, division) {
		var defaultdivs = this.state.defaultdivs;

		var div_string = defaultdivs[this.state.division_count].string;
		div_string = div_string.setCharAt(team-1, division.toString());

		defaultdivs[this.state.division_count].string = div_string;

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, defaultdivs, this.state.teams),
			defaultdivs: defaultdivs
		});
	},
	_getLeague: function(conf_count, div_count, defaultdivs, teams) {
		var div_string = defaultdivs[div_count];

		if (div_string) {
			var division = new DivisionList(div_string, conf_count, div_count, teams);
			return division.toArray();
		}
		else {
			return [];
		}
	},
	render: function() {
		return (
			<div id="divisionizer">
				<Header />

				<div className="application">
					<SettingsMenu
            conferences={this.state.conference_count} 
            divisions={this.state.division_count}
            teams={this.state.teams}
            cities={this.state.cities}
            onRelocateTeam={this.onRelocateTeam}
            onAddTeam={this.onAddTeam}
            onConferenceChange={this.onConferenceChange}
            />

          <div className="content">
				<Map league={this.state.league} />
				<LeagueDisplay league={this.state.league} onDrag={this.onDrag} />
          </div>
				</div>
				<Footer />
			</div>
		);
	}
});

module.exports = DragDropContext(DnDBackend)(Divisionizer);