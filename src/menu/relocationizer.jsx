import React, { PropTypes } from 'react';
import Team from '../league/team.model';

require('./_relocationizer.scss');

export default class Relocationizer extends React.Component {
  static propTypes = {
    teams: PropTypes.arrayOf(Team).isRequired,
    cities: PropTypes.array.isRequired,
    onRelocate: PropTypes.func.isRequired,
    onExpansion: PropTypes.func.isRequired,
  }

  getInitialState() {
    return {
      relocateTeam: 0,
      relocateCity: 0,
      expansionName: '',
      expansionCity: 0,
    };
  }

  relocate() {
    this.props.onRelocate(this.state.relocateTeam, this.state.relocateCity);
  }

  expand() {
    this.props.onExpansion(this.state.expansionName, this.state.expansionCity);
    this.setState({ expansionName: '' });
  }

  handleExpansionCityName(event) {
    this.setState({ expansionName: event.target.value });
  }

  handleExpansionCitySelect(event) {
    this.setState({ expansionCity: event.target.value });
  }
  handleRelocateCitySelect(event) {
    this.setState({ relocateCity: event.target.value });
  }
  handleRelocateTeamSelect(event) {
    this.setState({ relocateTeam: event.target.value });
  }

  render() {
    const teamNodes = this.props.teams.map(
      team => <option key={team.id} value={team.id}>{team.name}</option>,
    );

    const cityNodes = this.props.cities.map(
      city => <option key={city.id} value={city.id}>{city.city}</option>,
    );

    return (<div className="fieldgroup">
      <div className="field">
        <h3>Relocate team</h3>
        <div className="subfield">
          <label htmlFor="relocate_team">team</label>
          <select id="relocate_team" value={this.state.relocateTeam} onChange={this.handleRelocateTeamSelect}>
            {teamNodes}
          </select>
        </div>
        <div className="subfield">
          <label htmlFor="relocate_city">to</label>
          <select id="relocate_city" value={this.state.relocateCity} onChange={this.handleRelocateCitySelect}>
            {cityNodes}
          </select>
        </div>
        <div><button className="action" onClick={this.relocate}>Relocate Team</button></div>
      </div>

      <div className="field">
        <h3>Expansion team</h3>
        <div className="subfield">
          <label htmlFor="expand_city">city</label>
          <select id="expand_city" value={this.state.expansionCity} onChange={this.handleExpansionCitySelect}>
            {cityNodes}
          </select>
        </div>
        <div className="subfield">
          <label htmlFor="expand_name">name</label>
          <input id="expand_name" type="text" value={this.state.expansionName} onChange={this.handleExpansionCityName} />
        </div>
        <div><button className="action" onClick={this.expand}>Create Team</button></div>
      </div>
    </div>);
  }
}
