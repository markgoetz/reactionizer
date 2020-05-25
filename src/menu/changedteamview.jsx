import React from 'react';
import PropTypes from 'prop-types';

import Team from '../league/team.model';
import './_changedteamview.scss';

export default class ChangedTeamView extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.team.id);
  }
  _getMessage() {
    const team = this.props.team;

    if (this.props.type === 'relocation') {
      return `Moved ${team.name} to ${team.city}`;
    } else if (this.props.type === 'expansion') {
      return `Created ${team.city} ${team.name}`;
    }

    return '';
  }
  render() {
    return (<div key={this.props.team.id} className="changedteam">
      <span>{this._getMessage()}</span>
      <button className="changedteam_button" onClick={this.handleClick}>Undo</button>
    </div>);
  }
}

ChangedTeamView.propTypes = {
  type: PropTypes.string.isRequired,
  team: PropTypes.instanceOf(Team).isRequired,
  onClick: PropTypes.func.isRequired,
};
