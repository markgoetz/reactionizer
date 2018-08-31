import React from 'react';
import PropTypes from 'prop-types';

import Team from '../league/team.model';
import City from '../containers/city.model';

require('./_actionbutton.scss');
require('./_relocationizer.scss');

export default class Relocationizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relocateTeam: 0,
      relocateCity: 0,
      expansionName: '',
      expansionCity: 0,
    };
  }

  onRelocate = () => {
    this.props.onRelocate(this.state.relocateTeam, this.state.relocateCity);
  }

  onExpand = () => {
    this.props.onExpansion(this.state.expansionName, this.state.expansionCity);
    this.setState({ expansionName: '' });
  }

  onExpansionNameChange = (event) => {
    this.setState({ expansionName: event.target.value });
  }

  onExpansionCitySelect = (event) => {
    this.setState({ expansionCity: event.target.value });
  }

  onRelocateCitySelect = (event) => {
    this.setState({ relocateCity: event.target.value });
  }

  onRelocateTeamSelect = (event) => {
    this.setState({ relocateTeam: event.target.value });
  }

  render() {
    const teamNodes = this.props.teams.map(
      team => <option key={team.id} value={team.id}>{team.name}</option>,
    );

    const cityNodes = this.props.cities.map(
      city => <option key={city.id} value={city.id}>{city.name}</option>,
    );

    return (<div className="formgroup">
      <div className="form">
        <h3 className="form_heading">Relocate team</h3>
        <div className="field">
          <label htmlFor="relocate_team" className="field_label">team</label>
          <select id="relocate_team" value={this.state.relocateTeam} onChange={this.onRelocateTeamSelect} className="field_item">
            {teamNodes}
          </select>
        </div>
        <div className="field">
          <label htmlFor="relocate_city" className="field_label">to</label>
          <select id="relocate_city" value={this.state.relocateCity} onChange={this.onRelocateCitySelect} className="field_item">
            {cityNodes}
          </select>
        </div>
        <div><button className="actionbutton" onClick={this.onRelocate}>Relocate Team</button></div>
      </div>

      <div className="form">
        <h3 className="form_heading">Expansion team</h3>
        <div className="field">
          <label htmlFor="expand_city" className="field_label">city</label>
          <select id="expand_city" value={this.state.expansionCity} onChange={this.onExpansionCitySelect} className="field_item">
            {cityNodes}
          </select>
        </div>
        <div className="field">
          <label htmlFor="expand_name" className="field_label">name</label>
          <input id="expand_name" type="text" value={this.state.expansionName} onChange={this.onExpansionNameChange} className="field_item" />
        </div>
        <div><button className="actionbutton" onClick={this.onExpand}>Create Team</button></div>
      </div>
    </div>);
  }
}

Relocationizer.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
  onRelocate: PropTypes.func.isRequired,
  onExpansion: PropTypes.func.isRequired,
};
