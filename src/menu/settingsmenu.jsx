import React, { PropTypes } from 'react';
import HeaderWithButton from '../global/HeaderWithButton';
import ConferenceSelector from './conferenceselector';
import DivisionSelector from './DivisionSelector';
import Relocationizer from './relocationizer';
import Expansionizer from './Expansionizer';
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

  conferenceChange = (c) => {
    this.props.onConferenceChange(c, this.props.divisions);
  }

  divisionChange = (d) => {
    this.props.onConferenceChange(this.props.conferences, d);
  }

  render() {
    const modifier = (this.state.menuOpen) ? 'open' : 'closed';
    const buttonLabel = (this.state.menuOpen) ? 'Close' : 'Open';
    const menuClass = `menu menu-${modifier}`;

    return (<div className="menucontainer">
      <div className="menuheader">
        <HeaderWithButton title="Settings" buttonLabel={buttonLabel} onClick={this.toggleMenu} />
      </div>
      <div className={menuClass}>
        <div className="pane pane-main">
          <div className="formgroup">
            <ConferenceSelector
              conferences={this.props.conferences}
              onConferenceChange={this.conferenceChange}
            />
            <DivisionSelector
              conferences={this.props.conferences}
              divisions={this.props.divisions}
              onDivisionChange={this.divisionChange}
            />
          </div>
          <div className="formgroup">
            <Relocationizer
              teams={this.props.teams}
              cities={this.props.cities}
              onRelocate={this.props.onRelocate}
            />
            <Expansionizer
              cities={this.props.cities}
              onExpansion={this.props.onExpansion}
            />
          </div>
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
