var React = require("react");
var MenuHeader = require("./menuheader");
var ConferenceSelector = require("./conferenceselector");
var Relocationizer = require("./relocationizer");
var ChangeView = require("./changeview");
require("../global/_pane.scss");
require("./_settingsmenu.scss");


var SettingsMenu = React.createClass({
	propTypes: {
		conferences: React.PropTypes.number.isRequired,
		divisions: React.PropTypes.number.isRequired,
		teams: React.PropTypes.array.isRequired,
		cities: React.PropTypes.array.isRequired,
		relocatedTeams: React.PropTypes.array,
		expansionTeams: React.PropTypes.array,
		onConferenceChange: React.PropTypes.func.isRequired,
		onRelocate: React.PropTypes.func.isRequired,
		onExpansion: React.PropTypes.func.isRequired,
		onUndoRelocation: React.PropTypes.func.isRequired,
		onUndoExpansion: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {menu_open:false};
	},
	render: function() {
		var menu_modifier = "menu-" + ((this.state.menu_open) ? "open" : "closed");

		return (<div className="menucontainer">
			<MenuHeader click={this.toggleMenu} open={this.state.menu_open} />
			<div className={"menu " + menu_modifier}>
				<div className="pane pane-main">
					<ConferenceSelector
						conferences={this.props.conferences}
						divisions={this.props.divisions}
						onConferenceChange={this.onConferenceChange}
					/>
					<Relocationizer
						teams={this.props.teams}
						cities={this.props.cities}
						onRelocate={this.props.onRelocate}
						onExpansion={this.props.onExpansion}
					/>
				</div>
				<div className="pane pane-secondary">
					<ChangeView
						relocatedTeams={this.props.relocatedTeams}
						expansionTeams={this.props.expansionTeams}
						onUndoRelocation={this.props.onUndoRelocation}
						onUndoExpansion={this.props.onUndoExpansion}
					/>
				</div>
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

module.exports = SettingsMenu;
