import stringSetCharAt from '../global/setcharat-polyfill';

export default class LeagueModel {
  constructor(league, conferenceCount, divisionCount) {
    this.divisionCount = divisionCount;
    this.conferenceCount = conferenceCount;
    this.divString = league.string;
    this.divNames = league.names;
  }

  getString() {
    return this.divString;
  }

  setString(string) {
    this.divString = string;
  }

  addTeam(divNumber) {
    this.divString = `${this.divString}${divNumber}`;
  }

  removeTeam(index) {
    this.divString = stringSetCharAt(this.divString, index, '');
  }

  setTeamDivision(teamId, divNumber) {
    if (teamId < 0 || teamId > this.divString.length) return;
    if (divNumber < 0 || divNumber > this.divisionCount) return;

    this.divString = stringSetCharAt(this.divString, teamId, divNumber);
  }

  getDivisionCounts() {
    const divCounts = [];

    for (let d = 0; d < this.divisionCount; d++) {
      divCounts.push(0);
    }

    for (let i = 0; i < this.divString.length; i++) {
      divCounts[this.divString[i]] += 1;
    }
    return divCounts;
  }

  toArray() {
    const leagueArray = [];
    let divInitNumber = 0;

    for (let c = 0; c < this.conferenceCount; c++) {
      leagueArray.push([]);

      for (let d = 0; d < this.divisionCount / this.conferenceCount; d++) {
        const a = [];
        a.name = this.divNames[divInitNumber];
        leagueArray[c].push(a);
        divInitNumber += 1;
      }
    }

    for (let teamId = 0; teamId < this.divString.length; teamId++) {
      const totalDivNumber = this.divString[teamId];

      const divsPerConference = this.divisionCount / this.conferenceCount;

      const c2 = Math.floor(totalDivNumber / divsPerConference);

      leagueArray[c2][totalDivNumber % divsPerConference].push(teamId);
    }

    return leagueArray;
  }
}
