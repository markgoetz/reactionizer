var allTeams;
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
		initString: React.PropTypes.string,
		teamurl: React.PropTypes.string,
		cityurl: React.PropTypes.string
	},
	componentDidMount: function() {
		$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
			console.log( thrownError );
		});

		$.ajax({
			url: this.props.teamurl,
			context: this,
			dataType: "json"			
		}).done(function(data) {
			this.setState({teams: data});
		});

		$.ajax({
			url: this.props.cityurl,
			context: this,
			dataType: "json"			
		}).done(function(data) {
			this.setState({cities: data});
		});
	},
	getInitialState: function() {
		return {
			conference_count:this.props.initConferences,
			division_count:this.props.initDivisions,
			string:this.props.initString,
			teams:[],
			cities:[],
			max_id: 32
		};
	},
	onAddTeam: function(name) {
		allTeams.conferences[0].divisions[0].teams.push({id:this.state.max_id++, name:name});
		this.setState({teams:allTeams});
	},
	onConferenceChange: function(c, d) {
		this.setState({conference_count:c, division_count:d});
	},
	render: function() {
		var league = [];

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
				<Map league={league} />
				<LeagueDisplay league={league} />
          </div>
				</div>
				<Footer />
			</div>
		);
	}
});