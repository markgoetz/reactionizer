import React from 'react';
import PropTypes from 'prop-types';

import HeaderWithButton from '../global/HeaderWithButton';
import ConferenceSelector from './conferenceselector';
import Relocationizer from './relocationizer';
import ChangeView from './changeview';
import Team from '../league/team.model';
import City from '../containers/city.model';

import styles from './_settingsmenu.scss';

export default class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const modifier = (this.state.menuOpen) ? 'open' : 'closed';
    const buttonLabel = (this.state.menuOpen) ? 'Close' : 'Open';
    const menuContainerClass = `menucontainer menucontainer-${modifier}`;
    const menuClass = `menu menu-${modifier}`;

    return (<div className={menuContainerClass}>
      <div className="menuheader">
        <HeaderWithButton title="Settings" buttonLabel={buttonLabel} onClick={this.toggleMenu} />
      </div>
      <div className={menuClass}>
        <div className="pane pane-main">
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
