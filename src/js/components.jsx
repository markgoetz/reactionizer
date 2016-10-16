var DivisionList;
var SettingsMenu;
var Map;
var LeagueDisplay;


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
	componentDidMount: function() {
		$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
			alert( thrownError );
		});

		$.ajax({
			url: this.props.dataurl,
			context: this,
			dataType: "json"			
		}).done(function(data) {
			this.setState({
				teams: data.teams,
				cities: data.cities,
				defaultdivs: data.defaultdivs,
				league: [],
				max_id: data.teams.length + 1
			});
			this._buildDivisions();
		});
	},
	getInitialState: function() {
		return {
			conference_count:this.props.initConferences,
			division_count:this.props.initDivisions,
			teams:[],
			cities:[],
			defaultdivs:[],
			league:[],
			max_id: 0
		};
	},
	onRelocateTeam: function(teamid, cityid) {
		var teams = this.state.teams;
		var team = teams[teamid];
		var city = this.state.cities[cityid];

		team.cityname = city.name;
		team.lat = city.lat;
		team.lon = city.lon;

		this.setState({teams: teams});
		this._buildDivisions();
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

		//TODO: Update the strings.

		this._buildDivisions();
	},
	onConferenceChange: function(c, d) {
		this.setState({conference_count:c, division_count:d});
		this._buildDivisions();
	},
	_buildDivisions: function() {
		var div_string = this.state.defaultdivs[this.state.conference_count + ":" + this.state.division_count];

		if (div_string) {
			var division = new DivisionList(div_string, this.state.conference_count, this.state.division_count, this.state.teams);
			this.setState({league: division.toArray()});
		}
		else {
			this.setState({league: []});
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
				<LeagueDisplay league={this.state.league} />
          </div>
				</div>
				<Footer />
			</div>
		);
	}
});