var React = require("react");

require("./_divisionizer.scss");

var Header = require("./header");
var Footer = require("./footer");
var SettingsMenu = require("../menu/settingsmenu");
var Map = require("../map/map");
var LeagueDisplay = require("../league/leaguedisplay");

var Divisionizer = React.createClass({
	propTypes: {
		conferences: React.PropTypes.number.isRequired,
		divisions: React.PropTypes.number.isRequired,
		teams: React.PropTypes.array.isRequired,
		cities: React.PropTypes.array.isRequired,
		league: React.PropTypes.array.isRequired,
		relocatedTeams: React.PropTypes.array,
		expansionTeams: React.PropTypes.array,
		onRelocate: React.PropTypes.func.isRequired,
		onExpansion: React.PropTypes.func.isRequired,
		onConferenceChange: React.PropTypes.func.isRequired,
		onDrag: React.PropTypes.func.isRequired,
		onUndoRelocation: React.PropTypes.func.isRequired,
		onUndoExpansion: React.PropTypes.func.isRequired
	},
	render: function() {
		return (
			<div id="divisionizer">
				<Header />

				<div className="application">
					<SettingsMenu
						conferences={this.props.conferences} 
						divisions={this.props.divisions}
						teams={this.props.teams}
						cities={this.props.cities}
						relocatedTeams={this.props.relocatedTeams}
						expansionTeams={this.props.expansionTeams}
						onRelocate={this.props.onRelocate}
						onExpansion={this.props.onExpansion}
						onConferenceChange={this.props.onConferenceChange}
						onUndoRelocation={this.props.onUndoRelocation}
						onUndoExpansion={this.props.onUndoExpansion}						
					/>

					<div className="content">
						<Map league={this.props.league} />
						<LeagueDisplay league={this.props.league} onDrag={this.props.onDrag} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
});

module.exports = Divisionizer;