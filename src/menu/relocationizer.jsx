import React, { PropTypes } from 'react';
import Team from '../league/team.model';
import City from '../containers/city.model';

require('./_actionbutton.scss');

export default class Relocationizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: 0,
      city: 0,
    };
  }

  onRelocate = () => {
    this.props.onRelocate(this.state.team, this.state.city);
  }

  onCitySelect = (event) => {
    this.setState({ city: event.target.value });
  }

  onTeamSelect = (event) => {
    this.setState({ team: event.target.value });
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
          <select id="relocate_team" value={this.state.relocateTeam} onChange={this.onTeamSelect} className="field_item">
            {teamNodes}
          </select>
        </div>
        <div className="field">
          <label htmlFor="relocate_city" className="field_label">to</label>
          <select id="relocate_city" value={this.state.relocateCity} onChange={this.onCitySelect} className="field_item">
            {cityNodes}
          </select>
        </div>
        <div><button className="actionbutton" onClick={this.onRelocate}>Relocate Team</button></div>
      </div>
    </div>);
  }
}

Relocationizer.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
  onRelocate: PropTypes.func.isRequired,
};
