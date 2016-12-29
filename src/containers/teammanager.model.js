import Team from '../league/team.model';

export default class TeamManager {
  constructor(jsonTeams) {
    this.teams = jsonTeams.map((t, index) => {
      const newTeam = t;
      newTeam.id = index;
      return new Team(newTeam);
    });
  }

  relocateTeam(teamid, city) {
    this.teams[teamid].relocate(city);
  }

  resetTeam(teamid) {
    this.teams[teamid].reset();
  }

  addTeam(name, city) {
    this.teams.push(new Team(
      {
        name,
        id: this.teams.length,
        cityid: city.id,
        city: city.city,
        lat: city.lat,
        lon: city.lon,
      },
      true,
    ));
  }

  removeTeam(id) {
    this.teams.splice(id, 1);

    for (let i = 0; i < this.teams.length; i += 1) {
      this.teams[i].id = i;
    }
  }

  getRelocatedTeams() {
    return this.teams.filter(t => t.relocated);
  }

  getExpansionTeams() {
    return this.teams.filter(t => t.expansion);
  }

  getTeamCount() {
    return this.teams.length;
  }
}
