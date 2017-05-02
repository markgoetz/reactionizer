import League from '../league/league.model';
import getMinValueIndex from '../global/getminvalueindex-polyfill';

function getInitLeagues(initLeagues) {
  const leagues = [null, [], [], []];

  for (let c = 1; c < leagues.length; c++) {
    Object.keys(initLeagues).forEach((divCount) => {
      if (divCount % c !== 0) return;

      const initLeague = initLeagues[divCount];
      leagues[c][divCount] = new League(initLeague, c, divCount);
    });
  }

  return leagues;
}


export default class LeagueManager {
  constructor(defaultleagues) {
    this.defaultleagues = getInitLeagues(defaultleagues);
  }

  getLeague(conferences, divisions) {
    return this.defaultleagues[conferences][divisions];
  }

  getStrings() {
    const leagues = [];

    for (let c = 1; c < this.defaultleagues.length; c++) {
      for (let d = 1; d < this.defaultleagues[c].length; d++) {
        if (this.defaultleagues[c][d] != null) {
          leagues[d] = this.defaultleagues[c][d].getString();
        }
      }
    }

    return leagues;
  }

  setString(string, divCount) {
    for (let c = 1; c <= 3; c++) {
      if (this.defaultleagues[c][divCount] != null) {
        this.defaultleagues[c][divCount].setString(string);
      }
    }
  }

  addTeam() {
    // Put the new team in the division with the lowest number of teams.
    for (let c = 1; c <= 3; c++) {
      for (let d = 1; d <= 6; d++) {
        if (this.defaultleagues[c][d] != null) {
          const teamCounts = this.defaultleagues[c][d].getDivisionCounts();
          this.defaultleagues[c][d].addTeam(getMinValueIndex(teamCounts));
        }
      }
    }
  }

  removeTeam(id) {
    for (let c = 1; c <= 3; c++) {
      for (let d = 1; d < this.defaultleagues[c].length; d++) {
        if (this.defaultleagues[c][d] != null) {
          this.defaultleagues[c][d].removeTeam(id);
        }
      }
    }
  }

  changeTeamDivision(team, division, divisionCount) {
    for (let c = 1; c <= 3; c++) {
      if (this.defaultleagues[c][divisionCount] != null) {
        this.defaultleagues[c][divisionCount].setTeamDivision(team, division);
      }
    }
  }
}
