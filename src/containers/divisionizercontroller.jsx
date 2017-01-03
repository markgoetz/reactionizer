import React from 'react';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

import LeagueManager from '../containers/leaguemanager.model';
import TeamManager from '../containers/teammanager.model';
import Serializer from '../statemanagement/serializer';
import QueryString from '../statemanagement/querystring';
import Divisionizer from './divisionizer';

import jsonTeams from '../data/teams.json';
import jsonCities from '../data/cities.json';
import jsonDefaultLeagues from '../data/defaultleagues.json';

const DnDBackend = ('ontouchstart' in document.documentElement) ? TouchBackend : HTML5Backend;

class DivisionizerController extends React.Component {
  static propTypes = {
    initConferences: React.PropTypes.number,
    initDivisions: React.PropTypes.number,
  }

  getInitialState() {
    this.teammanager = new TeamManager(jsonTeams);
    this.leaguemanager = new LeagueManager(jsonDefaultLeagues);
    this.querystring = new QueryString();
    this.serializer = new Serializer();

    this.initConferences = this.props.initConferences;
    this.initDivisions = this.props.initDivisions;

    this.parseQueryString();

    return {
      conference_count: this.initConferences,
      division_count: this.initDivisions,
      league: this._getLeague(this.initConferences, this.initDivisions),
      cities: jsonCities,
    };
  }

  onDrag(team, division) {
    this.leaguemanager.changeTeamDivision(team, division, this.state.division_count);
    this._updateLeague();
  }

  onRelocateTeam(teamid, cityid) {
    this.teammanager.relocateTeam(teamid, jsonCities[cityid]);
    this._updateLeague();
  }

  onUndoRelocate(teamid) {
    this.teammanager.resetTeam(teamid);
    this._updateLeague();
  }

  onAddTeam(name, cityid) {
    this.teammanager.addTeam(name, jsonCities[cityid]);
    this.leaguemanager.addTeam();
    this._updateLeague();
  }

  onUndoExpansion(teamid) {
    this.leaguemanager.removeTeam(teamid);
    this.teammanager.removeTeam(teamid);
    this._updateLeague();
  }

  onConferenceChange(c, d) {
    this._updateLeague(c, d);
  }

  // The optional parameters are a hack to fix scenarios where you have to call React.setState()
  // on both the league and the division/conference count.
  _getLeague(
    confCount = this.state.conference_count,
    divisionCount = this.state.division_count,
    teams,
  ) {
    return this._leagueToArray(this.leaguemanager.getLeague(confCount, divisionCount), teams);
  }

  _updateLeague(
    confCount = this.state.conference_count,
    divisionCount = this.state.division_count,
  ) {
    const teams = this.teammanager.teams;

    const queryString = this.serializer.serialize(
      confCount,
      divisionCount,
      this.leaguemanager.getLeague(confCount, divisionCount).getString(),
      this.teammanager.getRelocatedTeams(),
      this.teammanager.getExpansionTeams(),
    );

    this.querystring.set(queryString);

    this.setState({
      conference_count: confCount,
      division_count: divisionCount,
      league: this._getLeague(confCount, divisionCount, teams),
      teams,
      query_string: queryString,
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
    const data = this.serializer.deserialize(this.querystring.get());

    if (data.expansions) {
      data.expansions.forEach((t) => {
        this.teammanager.addTeam(t.name, jsonCities[t.city]);
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
        this.teammanager.relocateTeam(t.id, jsonCities[t.city]);
      });
    }
  }

  render() {
    return (<Divisionizer
      conferences={this.state.conference_count}
      divisions={this.state.division_count}
      teams={this.teammanager.teams}
      cities={this.state.cities}
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

export default DragDropContext(DnDBackend)(DivisionizerController);
