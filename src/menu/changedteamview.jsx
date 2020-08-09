import React from 'react';
import PropTypes from 'prop-types';

import Team from '../league/team.model';
import './_changedteamview.scss';

const ChangedTeamView = (props) => {
  const handleClick = () => {
    props.onClick(props.team.id);
  };

  const getMessage = () => {
    const { team } = props;

    if (props.type === 'relocation') {
      return `Moved ${team.name} to ${team.city}`;
    }

    if (props.type === 'expansion') {
      return `Created ${team.city} ${team.name}`;
    }

    return '';
  };

  return (
    <div key={props.team.id} className="changedteam">
      <span>{getMessage()}</span>
      <button type="button" className="changedteam_button" onClick={handleClick}>Undo</button>
    </div>
  );
};

export default ChangedTeamView;

ChangedTeamView.propTypes = {
  type: PropTypes.string.isRequired,
  team: PropTypes.instanceOf(Team).isRequired,
  onClick: PropTypes.func.isRequired,
};
