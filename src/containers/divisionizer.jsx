import React, { PropTypes } from 'react';
import Header from './header';
import Footer from './footer';
import SettingsMenu from '../menu/settingsmenu';
import Map from '../map/map';
import LeagueDisplay from '../league/leaguedisplay';
import Team from '../league/team.model';

require('./_divisionizer.scss');

export default function Divisionizer(props) {
  return (
    <div id="divisionizer">
      <Header />
      <div className="application">
        <SettingsMenu
          conferences={props.conferences}
          divisions={props.divisions}
          teams={props.teams}
          cities={props.cities}
          relocatedTeams={props.relocatedTeams}
          expansionTeams={props.expansionTeams}
          onRelocate={props.onRelocate}
          onExpansion={props.onExpansion}
          onConferenceChange={props.onConferenceChange}
          onUndoRelocation={props.onUndoRelocation}
          onUndoExpansion={props.onUndoExpansion}
        />

        <div className="content">
          <Map league={props.league} />
          <LeagueDisplay league={props.league} onDrag={props.onDrag} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

Divisionizer.propTypes = {
  conferences: PropTypes.number.isRequired,
  divisions: PropTypes.number.isRequired,
  teams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  cities: PropTypes.array.isRequired,
  league: PropTypes.arrayOf(PropTypes.array).isRequired,
  relocatedTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  expansionTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  onRelocate: PropTypes.func.isRequired,
  onExpansion: PropTypes.func.isRequired,
  onConferenceChange: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onUndoRelocation: PropTypes.func.isRequired,
  onUndoExpansion: PropTypes.func.isRequired,
};
