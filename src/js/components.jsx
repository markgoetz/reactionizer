var getLogoURL;
var allTeams;
var google;
var DivisionList;


var Header = React.createClass({
	render: function() {
		return <header>header</header>;
	}
});	


var SettingsMenu = React.createClass({
	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		teams: React.PropTypes.array,
		cities: React.PropTypes.array,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function() {
		return {menu_open:false};
	},
	render: function() {
		var menu_class = (this.state.menu_open) ? "open" : "closed";
		var button_label = (this.state.menu_open) ? "close" : "open";

		return (<div id="settings_container">
      <h2 id="settings_header">
        <span>Settings</span>
        <button onClick={this.toggleMenu}>{button_label}</button>
      </h2>
      <div id="settings_menu" className={menu_class}>
        <ConferenceSelector conferences={this.props.conferences} divisions={this.props.divisions} onConferenceChange={this.onConferenceChange} />
        <Relocationizer teams={this.props.teams} cities={this.props.cities} />
      </div>
    </div>);  
	},
	onConferenceChange: function(c,d) {
		this.props.onConferenceChange(c,d);
	},
	toggleMenu: function() {
		this.setState({menu_open: !this.state.menu_open});
	}
});


var ConferenceSelector = React.createClass({
	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function() {
		return {conferences:this.props.conferences,divisions:this.props.divisions};
	},
	render: function() {
		var conference_nodes = [3,2,1].map(function(conference) {
			return (
        <SelectorButton
          type="conference"
          key={"conference"+conference}
          value={conference}
          selected={conference==this.state.conferences}
          disabled={false}
          onButtonClick={this.conferenceUpdate} />
        );
		},
      this
    );
		var division_nodes = [6,4,3,2].map(function(division) {
			return (
        <SelectorButton
          type="division"
          key={"division"+division}
          value={division}
          selected={division==this.state.divisions}
          disabled={division % this.state.conferences != 0} 
          onButtonClick={this.divisionUpdate} />
        );
		},
      this
    );

		return (<div>
      <div className="field">
        <h3>Conferences</h3>
        <div className="subfield">
          <div className="selector-container">
            {conference_nodes}
          </div>
        </div>
      </div>
      
      <div className="field">
        <h3>Divisions</h3>  
        <div className="subfield">
          <div className="selector-container">
            {division_nodes}
          </div>
        </div>
      </div>
    </div>);
	},
	conferenceUpdate: function(c) {
		this.setState({conferences:c});
		var d = this.state.divisions;

		if (this.state.divisions % c != 0) {
			d = 6;
			this.setState({divisions:d});
		}

		this.props.onConferenceChange(c, d);
	},
	divisionUpdate: function(d) {
		this.setState({divisions:d});
		this.props.onConferenceChange(this.state.conferences, d);
	}
});	



var SelectorButton = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		type: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		value: React.PropTypes.string,
		onButtonClick: React.PropTypes.func
	},
	render: function() {
		var className = "div_button selector " + (this.props.selected ? " selected" : "") + (this.props.disabled ? " disabled" : "");
		var id = this.props.type + "_count_selector_" + this.props.value;
		return (<button
      className={className}
      id={id}
      disabled={this.props.disabled}
      onClick={this.handleClick}>
        {this.props.value}
      </button>);
	},
	handleClick: function() {
		this.props.onButtonClick(this.props.value);
	}
});



var Relocationizer = React.createClass({
	propTypes: {
		teams: React.PropTypes.array,
		cities: React.PropTypes.array
	},
	render: function() {
		var team_nodes = this.props.teams.map(function(team) {
			return <option key={team.name}>{team.name}</option>;
		});

		var city_nodes = this.props.cities.map(function(city) {
			return <option key={city.city}>{city.city}</option>;
		});

		return (<div>
      <div className="field">
        <h3>Relocate team</h3>
        <div className="subfield"><label>team</label><select>{team_nodes}</select></div>
        <div className="subfield"><label>to</label><select>{city_nodes}</select></div>
        <div><button className="action">Relocate Team</button></div>
      </div>

        <div className="field">
          <h3>Expansion team</h3>
          <div className="subfield"><label>city</label><select>{city_nodes}</select></div>
          <div className="subfield"><label>name</label><input type="text" /></div>
          <div><button className="action">Create Team</button></div>
        </div>
      </div>);
	}
});



var Map = React.createClass({
	render: function() {
    //this._updatePolygons();
    //this._updatePins();

		return <div id="map"></div>;
	},
	componentDidMount: function() {
		this.polygons = new Array();
		this.pins = new Array();
  
		var latlng = new google.maps.LatLng(41,-96);
		var myOptions = {
			zoom: 4,
			center: latlng,
			maxZoom: 6,
			minZoom: 3,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(document.getElementById("map"), myOptions);

    //this._initPins(this.props.league);
    //this._initPolygons(this.props.league);
	},

	_initPins: function(teams) {
		for (var i = 0; i < teams.length; i++) {
			var team = teams[i];

			var ll = new google.maps.LatLng(team.lat,team.lon);
			var pin = new google.maps.Marker(
				{
					position:ll,
					title:team.city + " " + team.name,
					icon:getLogoURL(team)
				}
      );
			pin.setMap(this.map);
			this.pins.push(pin);
		}
	},

	_initPolygons: function(teams) {
		// var conference_count = teams.length;
		// var division_count = teams[0].length;


	},

	_updatePins: function () {

	},

	_updatePolygons: function() {

	}
});



var LeagueDisplay = React.createClass({
	propTypes: {
		league: React.PropTypes.array
	},
	render: function() {
		var nodes = this.props.league.map(function (conference,index) {
			return <Conference conference={conference} key={index} number={index} count={this.props.league.length} />;
		}, this);

		return <div id="teams">{nodes}</div>;
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
		teams: React.PropTypes.array,
		cities: React.PropTypes.array
	},
	getInitialState: function() {
		return {
			conference_count:this.props.initConferences,
			division_count:this.props.initDivisions,
			string:this.props.initString
		};
	},
	onAddTeam: function(name) {
		allTeams.conferences[0].divisions[0].teams.push({name:name});
		this.setState({teams:allTeams});
	},
	onConferenceChange: function(c, d) {
		this.setState({conference_count:c, division_count:d});
	},
	render: function() {
		var division_list = new DivisionList(this.state.string, this.state.conference_count, this.state.division_count);
		var teams=division_list.toArray();

		return (
			<div id="divisionizer">
				<Header />

				<div className="application">
					<SettingsMenu
            conferences={this.state.conference_count} 
            divisions={this.state.division_count}
            teams={this.props.teams}
            cities={this.props.cities}
            onRelocateTeam={this.onRelocateTeam}
            onAddTeam={this.onAddTeam}
            onConferenceChange={this.onConferenceChange}
            />

          <div className="content">
				<Map league={teams} />
				<LeagueDisplay league={teams} />
          </div>
				</div>
				<Footer />
			</div>
		);
	}
});