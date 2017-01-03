import React, { PropTypes } from 'react';
import MenuHeader from './menuheader';
import ConferenceSelector from './conferenceselector';
import Relocationizer from './relocationizer';
import ChangeView from './changeview';

require('./_settingsmenu.scss');

export default class SettingsMenu extends React.Component {
  static propTypes = {
    conferences: React.PropTypes.number.isRequired,
    divisions: React.PropTypes.number.isRequired,
    teams: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    relocatedTeams: PropTypes.array,
    expansionTeams: PropTypes.array,
    onConferenceChange: PropTypes.func.isRequired,
    onRelocate: PropTypes.func.isRequired,
    onExpansion: PropTypes.func.isRequired,
    onUndoRelocation: PropTypes.func.isRequired,
    onUndoExpansion: PropTypes.func.isRequired,
  }

  getInitialState() {
    return { menuOpen: false };
  }

  onConferenceChange(c, d) {
    this.props.onConferenceChange(c, d);
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const menuClass = (this.state.menuOpen) ? 'open' : 'closed';

    return (<div id="settings_container">
      <MenuHeader click={this.toggleMenu} open={this.state.menuOpen} />
      <div id="settings_menu" className={menuClass}>
        <div className="pane" id="main">
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
        <div className="pane" id="secondary">
          <ChangeView
            relocatedTeams={this.props.relocatedTeams}
            expansionTeams={this.props.expansionTeams}
            onUndoRelocation={this.props.onUndoRelocation}
            onUndoExpansion={this.props.onUndoExpansion}
          />
        </div>
      </div>
    </div>);
  }
}
