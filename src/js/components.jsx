var React = require("react");
var DivisionList = require("./division.class");
var Team = require("./team.class");

var $ = require("jquery");

var SettingsMenu = require("./settingsmenu");
var Map = require("./map");
var LeagueDisplay = require("./leaguedisplay");

var Header = React.createClass({
	render: function() {
		return <header>header</header>;
	}
});	

var Footer = React.createClass({
	render: function() {
		return <footer>footer</footer>;
	}
});	

var Divisionizer = React.createClass({
	propTypes: {
		initConferences: React.PropTypes.number,
		initDivisions: React.PropTypes.number,
		dataurl: React.PropTypes.string
	},
	componentWillMount: function() {
		this.data = {defaultdivs:[],teams:[],cities:[]};
	},
	componentDidMount: function() {
		$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
			alert( thrownError );
		});

		$.ajax({
			url: this.props.dataurl,
			context: this,
			dataType: "json"			
		}).done(function(json) {
			this.data = {
				teams: json.teams.map(function(t) { return new Team(t); }),
				cities: json.cities,
				defaultdivs: json.defaultdivs
			};

			this.setState({
				league: this._getLeague(this.state.conference_count, this.state.division_count, this.data.defaultdivs, this.data.teams),
				max_id: this.data.teams.length + 1
			});
		});
	},
	getInitialState: function() {
		return {
			conference_count:this.props.initConferences,
			division_count:this.props.initDivisions,
			league:[],
			max_id: 0
		};
	},
	onRelocateTeam: function(teamid, cityid) {
		var teams = this.data.teams;
		var team = teams[teamid];
		var city = this.state.cities[cityid];

		team.cityname = city.name;
		team.lat = city.lat;
		team.lon = city.lon;

		this.data.teams = teams;

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.data.default_divs, this.data.teams)
		});
		this._getDivisions();
	},
	onAddTeam: function(name, cityid) {
		var city = this.data.cities[cityid];
		var team = {
			id: this.state.max_id++,
			name: name,
			city: city.name,
			lat: city.lat,
			lon: city.lon
		};

		var teams = this.data.teams;
		teams.push(team);
		this.data.teams = teams;

		//TODO: Update the default division strings.

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.data.defaultdivs, this.data.teams),
		});
	},
	onConferenceChange: function(c, d) {
		this.setState({
			conference_count: c,
			division_count: d,
			league: this._getLeague(c, d, this.data.defaultdivs, this.data.teams)
		});
	},
	onDrag: function(team, division) {
		var default_div = this.data.defaultdivs[this.state.division_count].string;
		default_div = default_div.setCharAt(team-1, division.toString());
		this.data.defaultdivs[this.state.division_count].string = default_div;

		this.setState({
			league: this._getLeague(this.state.conference_count, this.state.division_count, this.data.defaultdivs, this.data.teams)
		});
	},
	_getLeague: function(conf_count, div_count) {
		var div_string = this.data.defaultdivs[div_count];

		if (div_string) {
			var division = new DivisionList(div_string, conf_count, div_count, this.data.teams);
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
            teams={this.data.teams}
            cities={this.data.cities}
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

module.exports = Divisionizer;