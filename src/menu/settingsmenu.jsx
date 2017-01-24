import React, { PropTypes } from 'react';
import MenuHeader from './menuheader';
import ConferenceSelector from './conferenceselector';
import Relocationizer from './relocationizer';
import ChangeView from './changeview';
import Team from '../league/team.model';
import City from '../containers/city.model';

require('./_settingsmenu.scss');

export default class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  toggleMenu = () => {
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
            onConferenceChange={this.props.onConferenceChange}
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

SettingsMenu.propTypes = {
  conferences: PropTypes.number.isRequired,
  divisions: PropTypes.number.isRequired,
  teams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
  relocatedTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  expansionTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  onConferenceChange: PropTypes.func.isRequired,
  onRelocate: PropTypes.func.isRequired,
  onExpansion: PropTypes.func.isRequired,
  onUndoRelocation: PropTypes.func.isRequired,
  onUndoExpansion: PropTypes.func.isRequired,
};
