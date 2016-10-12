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
		type: React.PropTypes.string,
		value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
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