import Team from './team.model';

const teamData = {
    name: 'Test Name',
    cityId: 0,
    city: 'City Name',
    lat: 12,
    lon: 23,
    id: 14  
};

const expansionTeamData = {
    name: 'Expansion Test Name',
    cityId: 3,
    city: 'Expansion City Name',
    lat: 14,
    lon: 26,
    id: 11  
};

const relocationCity = {
    name: 'Relocation City',
    cityId: 44,
    lat: 90,
    lon: 88
};

let team, expansionTeam;

beforeEach(() => {
    team = new Team(teamData, false);
    expansionTeam = new Team(expansionTeamData, true);
});

test('keeps the original data', () => {
    expect(team.originalData).toBe(teamData);
    expect(expansionTeam.originalData).toBe(expansionTeamData);
});

test('retrieves the logo for original teams', () => {
    expect(team.getLogoID()).toBe('logo-testname');
});

test('retrieves the expansion logo for expansion teams', () => {
    expect(expansionTeam.getLogoID()).toBe('logo-expansion');
});

test('changes the city when relocated', () => {
    team.relocate(relocationCity);
    expect(team.cityid).toBe(relocationCity.id);
    expect(team.city).toBe(relocationCity.name);
    expect(team.lat).toBe(relocationCity.lat);
    expect(team.lon).toBe(relocationCity.lon);
});

test('sets the relocated flag when relocated', () => {
    team.relocate(relocationCity);
    expect(team.relocated).toBe(true);
});

test('changes the city back when reset', () => {
    team.relocate(relocationCity);
    team.reset();
    expect(team.cityid).toBe(teamData.cityid);
    expect(team.city).toBe(teamData.city);
    expect(team.lat).toBe(teamData.lat);
    expect(team.lon).toBe(teamData.lon);
});

test('changes the flag back when reset', () => {
    team.relocate(relocationCity);
    team.reset();
    expect(team.relocated).toBe(false);
});
