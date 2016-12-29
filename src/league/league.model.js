require('../global/setcharat-polyfill');

export default class LeagueModel {
  constructor(league, conferenceCount, divisionCount) {
    this.div_count = divisionCount;
    this.conf_count = conferenceCount;
    this.div_string = league.string;
    this.div_names = league.names;
  }

  getString() {
    return this.div_string;
  }

  setString(string) {
    this.div_string = string;
  }

  addTeam(divNumber) {
    this.div_string = `${this.div_string}${divNumber}`;
  }

  removeTeam(index) {
    this.div_string = this.div_string.setCharAt(index, '');
  }

  setTeamDivision(teamId, divNumber) {
    if (teamId < 0 || teamId > this.div_string.length) return;
    if (divNumber < 0 || divNumber > this.div_count) return;

    this.div_string = this.div_string.setCharAt(teamId, divNumber);
  }

  getDivisionCounts() {
    const divCounts = [];

    for (let d = 0; d < this.div_count; d++) {
      divCounts.push(0);
    }

    for (let i = 0; i < this.div_string.length; i++) {
      divCounts[this.div_string[i]] += 1;
    }
    return divCounts;
  }

  toArray() {
    const leagueArray = [];
    let divInitNumber = 0;

    for (let c = 0; c < this.conf_count; c++) {
      leagueArray.push([]);

      for (let d = 0; d < this.div_count / this.conf_count; d++) {
        const a = [];
        a.name = this.div_names[divInitNumber];
        leagueArray[c].push(a);
        divInitNumber += 1;
      }
    }

    for (let teamId = 0; teamId < this.div_string.length; teamId++) {
      const totalDivNumber = this.div_string[teamId];

      const divsPerConference = this.div_count / this.conf_count;

      const c2 = Math.floor(totalDivNumber / divsPerConference);

      leagueArray[c2][totalDivNumber % divsPerConference].push(teamId);
    }

    return leagueArray;
  }
}
