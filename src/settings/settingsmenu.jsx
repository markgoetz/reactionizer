var React = require("react");
var MenuHeader = require("./menuheader");
var ConferenceSelector = require("./conferenceselector");
var Relocationizer = require("./relocationizer");
require("./_settingsmenu.scss");

var SettingsMenu = React.createClass({
	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		teams: React.PropTypes.array,
		cities: React.PropTypes.array,
		onConferenceChange: React.PropTypes.func,
		onRelocate: React.PropTypes.func
	},
	getInitialState: function() {
		return {menu_open:false};
	},
	render: function() {
		var menu_class = (this.state.menu_open) ? "open" : "closed";
		var button_label = (this.state.menu_open) ? "close" : "open";

		return (<div id="settings_container">
			<MenuHeader click={this.toggleMenu} open={this.state.menu_open} />
			<div id="settings_menu" className={menu_class}>
				<ConferenceSelector conferences={this.props.conferences} divisions={this.props.divisions} onConferenceChange={this.onConferenceChange} />
				<Relocationizer teams={this.props.teams} cities={this.props.cities} onRelocate={this.props.onRelocate} />
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