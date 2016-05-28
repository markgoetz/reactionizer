var allTeams = {
  			conferences: [
  				{
  					name: "Eastern",
  					divisions: [
  						{
  							name: "Atlantic",
  							teams: [
  								{name:'Florida'},
  								{name:'Montreal'},
  								{name:'Buffalo'},
  							],
  						},
  						{
  							name: "Metropolitan",
  							teams: [
  								{name:'New Jersey'},
  								{name:'Washington'},
  								{name:'Lumbus'}
  							]
  						}
  					]
  				},
  				{
  					name: "Western",
  					divisions: [
  						{
  							name: "Central",
  							teams: [
  								{name:'Dallas'},
  								{name:'Nashville'},
  								{name:'Winnipeg'},
  							],
  						},
  						{
  							name: "Pacific",
  							teams: [
  								{name:'Shorks'},
  								{name:'Vancouver'},
  								{name:'Arizona'}
  							]
  						}
  					]
  				}
  			]
  		};


  		var Header = React.createClass({
  			render: function() {
  				return <div id="logo">&nbsp;</div>
  			}
  		});	

  		var SettingsMenu = React.createClass({
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

  				return (<div class="fieldgroup">
            <div class="title">Organize teams into:</div>
            
            <div class="formfield">
              <label>Conferences</label>
              <div>
                {conference_nodes}
              </div>
            </div>
            
            <div class="formfield">
              <label>Divisions</label>
              <div>
                {division_nodes}
              </div>
            </div>
          </div>);
  			},
        conferenceUpdate: function(c) {
          this.setState({conferences:c});

          if (this.state.divisions % c != 0) {
            this.setState({divisions:6});
          }

        },
        divisionUpdate: function(d) {
          this.setState({divisions:d});
        }
  		});	

      var SelectorButton = React.createClass({
        render: function() {
          var className = "div_button" + (this.props.selected ? ' selected' : '') + (this.props.disabled ? ' disabled' : '');
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

  		var Map = React.createClass({
  			render: function() {
  				return <div id="map"></div>
  			}
  		});	

  		var LeagueDisplay = React.createClass({
  			render: function() {
  				var nodes = this.props.league.conferences.map(function (conference) {
  					return <div class="item" key={conference.name}><Conference conference={conference} /></div>
  				});

  				return <div id="league"><h2>Divisions in your league</h2>{nodes}</div>;
  			}
  		});	

  		var Conference = React.createClass({
  			render: function() {
  				var division_nodes = this.props.conference.divisions.map(function (division) {
  					return <div class="item" key={division.name}><Division division={division} /></div>
  				});

  				return <div class="conference"><h2>{this.props.conference.name}</h2>{division_nodes}</div>;
  			}
  		});

  		 var Division = React.createClass({
  			render: function() {
  				var team_nodes = this.props.division.teams.map(function (team) {
  					return <div class="item" key={team.name}><Team team={team} /></div>
  				});

  				return <div class="division"><h2>{this.props.division.name}</h2>{team_nodes}</div>;
  			}
  		});

  		var Team = React.createClass({
  			render: function() {
  				return <div class="team">{this.props.team.name}</div>;
  			}
  		});

  		var Footer = React.createClass({
  			render: function() {
  				return <div id="copyright"><div class="gutter">Divisionizer &copy; 2011 <a href="http://markandrewgoetz.com/">Mark Goetz</a>.  All team names and logos are &copy; National Hockey League.  This site is not affiliated with the NHL.<br/></div>
</div>

  			}
  		});	




  		var Divisionizer = React.createClass({
        getInitialState: function() {
          return {teams:allTeams};
        },
        onAddTeam: function(name) {
          allTeams.conferences[0].divisions[0].teams.push({name:name});
          this.setState({teams:allTeams});
        },
  			render: function() {
  				return (
  					<div id="divisionizer">
  						<div id="top">
  							<Header />
  						</div>
  						<div id="middle">
  							<SettingsMenu onAddTeam={this.onAddTeam} conferences={this.props.conferences} divisions={this.props.divisions} />
  							<Map />
  							<LeagueDisplay league={this.state.teams} />
  						</div>
  						<div id="bottom">
  							<Footer />
  						</div>
  					</div>
  				);
  			}

  		});


    ReactDOM.render(
      <Divisionizer conferences="1" divisions="4" />,
        document.getElementById('container')
    );  