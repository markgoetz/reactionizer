import React, { useState } from 'react';
import PropTypes from 'prop-types';

import HeaderWithButton from '../global/HeaderWithButton';
import ConferenceSelector from './conferenceselector';
import Relocationizer from './relocationizer';
import ChangeView from './changeview';
import Team from '../league/team.model';
import City from '../containers/city.model';

import './_settingsmenu.scss';

const SettingsMenu = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const modifier = (menuOpen) ? 'open' : 'closed';
  const buttonLabel = (menuOpen) ? 'Close' : 'Open';
  const menuContainerClass = `menucontainer menucontainer-${modifier}`;
  const menuClass = `menu menu-${modifier}`;

  return (
    <div className={menuContainerClass}>
      <div className="menuheader">
        <HeaderWithButton title="Settings" buttonLabel={buttonLabel} onClick={toggleMenu} />
      </div>
      <div className={menuClass}>
        <div className="pane pane-main">
          <ConferenceSelector
            conferences={props.conferences}
            divisions={props.divisions}
            onConferenceChange={props.onConferenceChange}
          />
          <Relocationizer
            teams={props.teams}
            cities={props.cities}
            onRelocate={props.onRelocate}
            onExpansion={props.onExpansion}
          />
        </div>
        <div className="pane pane-secondary">
          <ChangeView
            relocatedTeams={props.relocatedTeams}
            expansionTeams={props.expansionTeams}
            onUndoRelocation={props.onUndoRelocation}
            onUndoExpansion={props.onUndoExpansion}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;

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

SettingsMenu.defaultProps = {
  relocatedTeams: [],
  expansionTeams: [],
};
