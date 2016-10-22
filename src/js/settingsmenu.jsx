var React = require("react");
var ConferenceSelector = require("./conferenceselector");
var Relocationizer = require("./relocationizer");

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

module.exports = SettingsMenu;