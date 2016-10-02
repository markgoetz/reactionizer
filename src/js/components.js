var Header = React.createClass({
  displayName: 'Header',

  render: function () {
    return React.createElement(
      'header',
      null,
      'header'
    );
  }
});

var SettingsMenu = React.createClass({
  displayName: 'SettingsMenu',

  getInitialState: function () {
    return { menu_open: false };
  },
  render: function () {
    var menu_class = this.state.menu_open ? 'open' : 'closed';
    var button_label = this.state.menu_open ? 'close' : 'open';

    return React.createElement(
      'div',
      { id: 'settings_container' },
      React.createElement(
        'h2',
        { id: 'settings_header' },
        React.createElement(
          'span',
          null,
          'Settings'
        ),
        React.createElement(
          'button',
          { onClick: this.toggleMenu },
          button_label
        )
      ),
      React.createElement(
        'div',
        { id: 'settings_menu', className: menu_class },
        React.createElement(ConferenceSelector, { conferences: this.props.conferences, divisions: this.props.divisions, onConferenceChange: this.onConferenceChange }),
        React.createElement(Relocationizer, { teams: this.props.teams, cities: this.props.cities })
      )
    );
  },
  onConferenceChange: function (c, d) {
    this.props.onConferenceChange(c, d);
  },
  toggleMenu: function () {
    this.setState({ menu_open: !this.state.menu_open });
  }
});

var ConferenceSelector = React.createClass({
  displayName: 'ConferenceSelector',

  getInitialState: function () {
    return { conferences: this.props.conferences, divisions: this.props.divisions };
  },
  render: function () {
    var conference_nodes = [3, 2, 1].map(function (conference) {
      return React.createElement(SelectorButton, {
        type: 'conference',
        key: "conference" + conference,
        value: conference,
        selected: conference == this.state.conferences,
        disabled: false,
        onButtonClick: this.conferenceUpdate });
    }, this);
    var division_nodes = [6, 4, 3, 2].map(function (division) {
      return React.createElement(SelectorButton, {
        type: 'division',
        key: "division" + division,
        value: division,
        selected: division == this.state.divisions,
        disabled: division % this.state.conferences != 0,
        onButtonClick: this.divisionUpdate });
    }, this);

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'field' },
        React.createElement(
          'h3',
          null,
          'Conferences'
        ),
        React.createElement(
          'div',
          { className: 'subfield' },
          React.createElement(
            'div',
            { className: 'selector-container' },
            conference_nodes
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'field' },
        React.createElement(
          'h3',
          null,
          'Divisions'
        ),
        React.createElement(
          'div',
          { className: 'subfield' },
          React.createElement(
            'div',
            { className: 'selector-container' },
            division_nodes
          )
        )
      )
    );
  },
  conferenceUpdate: function (c) {
    this.setState({ conferences: c });
    var d = this.state.divisions;

    if (this.state.divisions % c != 0) {
      d = 6;
      this.setState({ divisions: d });
    }

    this.props.onConferenceChange(c, d);
  },
  divisionUpdate: function (d) {
    this.setState({ divisions: d });
    this.props.onConferenceChange(this.state.conferences, d);
  }
});

var SelectorButton = React.createClass({
  displayName: 'SelectorButton',

  render: function () {
    var className = "div_button selector " + (this.props.selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '');
    var id = this.props.type + '_count_selector_' + this.props.value;
    return React.createElement(
      'button',
      {
        className: className,
        id: id,
        disabled: this.props.disabled,
        onClick: this.handleClick },
      this.props.value
    );
  },
  handleClick: function (e) {
    this.props.onButtonClick(this.props.value);
  }
});

var Relocationizer = React.createClass({
  displayName: 'Relocationizer',

  render: function () {
    var team_nodes = this.props.teams.map(function (team) {
      return React.createElement(
        'option',
        { key: team.name },
        team.name
      );
    });

    var city_nodes = this.props.cities.map(function (city) {
      return React.createElement(
        'option',
        { key: city.city },
        city.city
      );
    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'field' },
        React.createElement(
          'h3',
          null,
          'Relocate team'
        ),
        React.createElement(
          'div',
          { className: 'subfield' },
          React.createElement(
            'label',
            null,
            'team'
          ),
          React.createElement(
            'select',
            null,
            team_nodes
          )
        ),
        React.createElement(
          'div',
          { className: 'subfield' },
          React.createElement(
            'label',
            null,
            'to'
          ),
          React.createElement(
            'select',
            null,
            city_nodes
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            { className: 'action' },
            'Relocate Team'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'field' },
        React.createElement(
          'h3',
          null,
          'Expansion team'
        ),
        React.createElement(
          'div',
          { className: 'subfield' },
          React.createElement(
            'label',
            null,
            'city'
          ),
          React.createElement(
            'select',
            null,
            city_nodes
          )
        ),
        React.createElement(
          'div',
          { className: 'subfield' },
          React.createElement(
            'label',
            null,
            'name'
          ),
          React.createElement('input', { type: 'text' })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            { className: 'action' },
            'Create Team'
          )
        )
      )
    );
  }
});

var Map = React.createClass({
  displayName: 'Map',

  render: function () {
    //this._updatePolygons();
    //this._updatePins();

    return React.createElement('div', { id: 'map' });
  },
  componentDidMount: function () {
    this.polygons = new Array();
    this.pins = new Array();

    var latlng = new google.maps.LatLng(41, -96);
    var myOptions = {
      zoom: 4,
      center: latlng,
      maxZoom: 6,
      minZoom: 3,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions);

    //this._initPins(this.props.league);
    //this._initPolygons(this.props.league);
  },

  _initPins: function (teams) {
    for (var i = 0; i < teams.length; i++) {
      var team = teams[i];

      var ll = new google.maps.LatLng(team.lat, team.lon);
      var pin = new google.maps.Marker({
        position: ll,
        title: team.city + ' ' + team.name,
        icon: getLogoURL(team)
      });
      pin.setMap(map);
      this.pins.push(marker);
    }
  },

  _initPolygons: function (teams) {
    var conference_count = teams.length;
    var division_count = teams[0].length;
  },

  _updatePins: function () {},

  _updatePolygons: function () {}
});

var LeagueDisplay = React.createClass({
  displayName: 'LeagueDisplay',

  render: function () {
    var nodes = this.props.league.map(function (conference, index) {
      return React.createElement(Conference, { conference: conference, key: index, count: this.props.league.length });
    }, this);

    return React.createElement(
      'div',
      { id: 'teams' },
      nodes
    );
  }
});

var Conference = React.createClass({
  displayName: 'Conference',

  render: function () {
    var division_nodes = this.props.conference.map(function (division, index) {
      return React.createElement(Division, { division: division, key: index, count: this.props.conference.length * this.props.count });
    }, this);

    var className = "conference col-" + this.props.count;
    return React.createElement(
      'div',
      { className: className },
      division_nodes
    );
  }
});

var Division = React.createClass({
  displayName: 'Division',

  render: function () {
    var team_nodes = this.props.division.map(function (team) {
      return React.createElement(Team, { team: team, key: team.name });
    });

    var className = "division col-" + this.props.count;
    return React.createElement(
      'div',
      { className: className },
      React.createElement(
        'div',
        { className: 'name' },
        this.props.division.name
      ),
      React.createElement(
        'div',
        { className: 'list' },
        team_nodes
      )
    );
  }
});

var Team = React.createClass({
  displayName: 'Team',

  render: function () {
    var source = getLogoURL(this.props.team);
    return React.createElement(
      'div',
      { className: 'team' },
      React.createElement('img', { className: 'team-logo', src: source }),
      React.createElement(
        'span',
        { className: 'city' },
        this.props.team.city
      ),
      React.createElement(
        'span',
        { className: 'name' },
        ' ',
        this.props.team.name
      )
    );
  }
});

var Footer = React.createClass({
  displayName: 'Footer',

  render: function () {
    return React.createElement(
      'footer',
      null,
      'footer'
    );
  }
});

var Divisionizer = React.createClass({
  displayName: 'Divisionizer',

  getInitialState: function () {
    return {
      conference_count: this.props.initConferences,
      division_count: this.props.initDivisions,
      string: this.props.initString
    };
  },
  onAddTeam: function (name) {
    allTeams.conferences[0].divisions[0].teams.push({ name: name });
    this.setState({ teams: allTeams });
  },
  onConferenceChange: function (c, d) {
    this.setState({ conference_count: c, division_count: d });
  },
  render: function () {
    var division_list = new DivisionList(this.state.string, this.state.conference_count, this.state.division_count);
    var teams = division_list.toArray();

    return React.createElement(
      'div',
      { id: 'divisionizer' },
      React.createElement(Header, null),
      React.createElement(
        'div',
        { className: 'application' },
        React.createElement(SettingsMenu, {
          conferences: this.state.conference_count,
          divisions: this.state.division_count,
          teams: this.props.teams,
          cities: this.props.cities,
          onRelocateTeam: this.onRelocateTeam,
          onAddTeam: this.onAddTeam,
          onConferenceChange: this.onConferenceChange
        }),
        React.createElement(
          'div',
          { className: 'content' },
          React.createElement(Map, { league: teams }),
          React.createElement(LeagueDisplay, { league: teams })
        )
      ),
      React.createElement(Footer, null)
    );
  }
});
//# sourceMappingURL=components.js.map
