var Header = React.createClass({
	render: function() {
		return <div id="head-logo">header</div>;
	}
});	


var SettingsMenu = React.createClass({
  render: function() {
    return (<div id="settings_container">
      <h2 id="settings_header">
        Settings
        <button>open</button>
      </h2>
      <div id="settings_menu">
        <ConferenceSelector conferences={this.props.conferences} divisions={this.props.divisions} onConferenceChange={this.onConferenceChange} />
        <Relocationizer teams={this.props.teams} cities={this.props.cities} />
      </div>
    </div>);  
  },
  onConferenceChange: function(c,d) {
    this.props.onConferenceChange(c,d);
  }
});


var ConferenceSelector = React.createClass({
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
        )
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

		return (<div className="field">
      <h3>Organize teams into:</h3>
      
      <div className="subfield">
        <h4>Conferences</h4>
        <div className="selector-container">
          {conference_nodes}
        </div>
      </div>
      
      <div className="subfield">
        <h4>Divisions</h4>
        <div className="selector-container">
          {division_nodes}
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
  render: function() {
    var className = "div_button selector " + (this.props.selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '');
    var id = this.props.type + '_count_selector_' + this.props.value;
    return (<button
      className={className}
      id={id}
      disabled={this.props.disabled}
      onClick={this.handleClick}>
        {this.props.value}
      </button>);
  },
  handleClick: function(e) {
    this.props.onButtonClick(this.props.value);
  }
});



var Relocationizer = React.createClass({
  render: function() {
    var team_nodes = this.props.teams.map(function(team) {
      return <option key={team.name}>{team.name}</option>
    });

    var city_nodes = this.props.cities.map(function(city) {
      return <option key={city.city}>{city.city}</option>
    });

    return (<div>
      <div className="field">
          <h3>Relocate team</h3>
          <div>
              <div><label>from</label><select>{team_nodes}</select></div>
              <div><label>to</label><select>{city_nodes}</select></div>
              <div><button className="action">Relocate Team</button></div>
          </div>
        </div>

        <div className="field">
          <h3>Expansion team</h3>
          <div>
              <div><label>city</label><select>{city_nodes}</select></div>
              <div><label>name</label><input type="text" /></div>
              <div><button className="action">Create Team</button></div>
          </div>
        </div>
      </div>);
  }
});



var Map = React.createClass({
	render: function() {
		return <div id="map">This is a map.</div>;
	}
});



var LeagueDisplay = React.createClass({
	render: function() {
		var nodes = this.props.league.map(function (conference,index) {
			return <Conference conference={conference} key={index} />;
		});

		return <div id="teams">{nodes}</div>;
	}
});	

var Conference = React.createClass({
	render: function() {
		var division_nodes = this.props.conference.map(function (division,index) {
			return <Division division={division} key={index} />
		});

		return <div className="conference">{division_nodes}</div>;
	}
});

 var Division = React.createClass({
	render: function() {
		var team_nodes = this.props.division.map(function (team) {
			return <Team team={team} key={team.name} />
		});

		return <div className="division"><div className="name">{this.props.division.name}</div><div className="list">{team_nodes}</div></div>;
	}
});

var Team = React.createClass({
	render: function() {
    var source=getLogoURL(this.props.team);
    return (<div className="team">
        <img className="team-logo" src={source} /><span className="city">{this.props.team.city}</span><span className="name">&nbsp;{this.props.team.name}</span>
      </div>);
	}
});

var Footer = React.createClass({
	render: function() {
		return <div id="footer">footer</div>
	}
});	




var Divisionizer = React.createClass({
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