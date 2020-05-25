import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

import LeagueManager from '../containers/leaguemanager.model';
import TeamManager from '../containers/teammanager.model';
import CityManager from '../containers/citymanager.model';
import { serialize, deserialize } from '../statemanagement/serializer';
import QueryString from '../statemanagement/querystring';
import Divisionizer from './divisionizer';

import jsonTeams from '../data/teams.json';
import jsonCities from '../data/cities.json';
import jsonDefaultLeagues from '../data/defaultleagues.json';

import './_divisionizer.scss';

const DnDBackend = ('ontouchstart' in document.documentElement) ? TouchBackend : HTML5Backend;

class DivisionizerController extends React.Component {
  constructor(props) {
    super(props);
    this.teammanager = new TeamManager(jsonTeams);
    this.citymanager = new CityManager(jsonCities);
    this.leaguemanager = new LeagueManager(jsonDefaultLeagues);

    this.initConferences = this.props.initConferences;
    this.initDivisions = this.props.initDivisions;

    this.parseQueryString();

    this.state = {
      conferenceCount: this.initConferences,
      divisionCount: this.initDivisions,
      league: this._getLeague(this.initConferences, this.initDivisions),
    };
  }

  onDrag = (team, division) => {
    this.leaguemanager.changeTeamDivision(team, division, this.state.divisionCount);
    this._updateLeague();
  }

  onRelocateTeam = (teamid, cityid) => {
    this.teammanager.relocateTeam(teamid, this.citymanager.getCity(cityid));
    this._updateLeague();
  }

  onUndoRelocate = (teamid) => {
    this.teammanager.resetTeam(teamid);
    this._updateLeague();
  }

  onAddTeam = (name, cityid) => {
    this.teammanager.addTeam(name, this.citymanager.getCity(Number(cityid)));
    this.leaguemanager.addTeam();
    this._updateLeague();
  }

  onUndoExpansion = (teamid) => {
    this.leaguemanager.removeTeam(teamid);
    this.teammanager.removeTeam(teamid);
    this._updateLeague();
  }

  onConferenceChange = (c, d) => {
    this._updateLeague(c, d);
  }

  // The optional parameters are a hack to fix scenarios where you have to call React.setState()
  // on both the league and the division/conference count.
  _getLeague(
    conferenceCount = this.state.conferenceCount,
    divisionCount = this.state.divisionCount,
    teams,
  ) {
    return this._leagueToArray(
      this.leaguemanager.getLeague(conferenceCount, divisionCount),
      teams);
  }

  _updateLeague(
    conferenceCount = this.state.conferenceCount,
    divisionCount = this.state.divisionCount,
  ) {
    const teams = this.teammanager.teams;

    const queryString = serialize(
      conferenceCount,
      divisionCount,
      this.leaguemanager.getLeague(conferenceCount, divisionCount).getString(),
      this.teammanager.getRelocatedTeams(),
      this.teammanager.getExpansionTeams(),
    );

    QueryString.set(queryString);

    this.setState({
      conferenceCount,
      divisionCount,
      league: this._getLeague(conferenceCount, divisionCount, teams),
      teams,
      queryString,
    });
  }

  _leagueToArray(league, teams = this.teammanager.teams) {
    const leagueArray = league.toArray();

    for (let c = 0; c < leagueArray.length; c++) {
      for (let d = 0; d < leagueArray[c].length; d++) {
        for (let t = 0; t < leagueArray[c][d].length; t++) {
          const teamId = leagueArray[c][d][t];
          leagueArray[c][d][t] = teams[teamId];
        }
      }
    }

    return leagueArray;
  }

  parseQueryString() {
    const data = deserialize(QueryString.get());

    if (data.expansions) {
      data.expansions.forEach((t) => {
        this.teammanager.addTeam(t.name, this.citymanager.getCity(t.city));
        this.leaguemanager.addTeam();
      });
    }

    if (data.conferences) {
      this.initConferences = data.conferences;
    }

    if (data.divisions) {
      this.initDivisions = data.divisions;
    }

    if (data.league) {
      const teams = this.teammanager.getTeamCount();
      const leagueString = data.league.slice(-teams);
      this.leaguemanager.setString(leagueString, this.initDivisions);
    }

    if (data.relocations) {
      data.relocations.forEach((t) => {
        this.teammanager.relocateTeam(t.id, this.citymanager.getCity(t.city));
      });
    }
  }

  render() {
    return (<Divisionizer
      conferences={this.state.conferenceCount}
      divisions={this.state.divisionCount}
      teams={this.teammanager.teams}
      cities={this.citymanager.getCities()}
      league={this.state.league}
      relocatedTeams={this.teammanager.getRelocatedTeams()}
      expansionTeams={this.teammanager.getExpansionTeams()}
      onRelocate={this.onRelocateTeam}
      onExpansion={this.onAddTeam}
      onUndoRelocation={this.onUndoRelocate}
      onUndoExpansion={this.onUndoExpansion}
      onConferenceChange={this.onConferenceChange}
      onDrag={this.onDrag}
      queryString={this.state.querystring}
    />);
  }
}

DivisionizerController.propTypes = {
  initConferences: PropTypes.number,
  initDivisions: PropTypes.number,
};

export default DragDropContext(DnDBackend)(DivisionizerController);
