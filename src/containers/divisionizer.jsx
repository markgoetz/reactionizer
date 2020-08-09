import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import SettingsMenu from '../menu/settingsmenu';
import Map from '../map/map';
import LeagueDisplay from '../league/leaguedisplay';
import Team from '../league/team.model';
import City from './city.model';

export default function Divisionizer(props) {
  const { API_KEY } = process.env;

  return (
    <div className="page">
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

        <div className="contentContainer">
          <Map
            league={props.league}
            containerElement={<div id="mapcontainer" />}
            mapElement={<div id="map" className="map" />}
            loadingElement={<div />}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
          />
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
  cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
  league: PropTypes.arrayOf(PropTypes.array).isRequired,
  relocatedTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  expansionTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  onRelocate: PropTypes.func.isRequired,
  onExpansion: PropTypes.func.isRequired,
  onConferenceChange: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onUndoRelocation: PropTypes.func.isRequired,
  onUndoExpansion: PropTypes.func.isRequired,
};
