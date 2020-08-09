import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ChangedTeamView from './changedteamview';
import HeaderWithButton from '../global/HeaderWithButton';
import Team from '../league/team.model';

require('./_changeview.scss');

const ChangeView = (props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const changeCount = props.relocatedTeams.length + props.expansionTeams.length;

  const relocatedNodes = props.relocatedTeams.map(
    team => (
      <ChangedTeamView
        key={team.id}
        team={team}
        onClick={props.onUndoRelocation}
        type="relocation"
      />
    ),
  );

  const expansionNodes = props.expansionTeams.map(
    team => (
      <ChangedTeamView
        key={team.id}
        team={team}
        onClick={props.onUndoExpansion}
        type="expansion"
      />
    ),
  );

  const stateModifier = open ? 'open' : 'closed';
  const className = `changedteams_list changedteams_list-${stateModifier}`;
  const buttonLabel = open ? 'close' : 'open';
  const changeCountIndicator = (changeCount > 0) ? changeCount.toString() : '';

  return (
    <div className="changed_teams">
      <div className="changedteams_title">
        <HeaderWithButton title="Changes" bubbleText={changeCountIndicator} buttonLabel={buttonLabel} onClick={toggle} />
      </div>

      <div id="changelist" className={className}>
        {relocatedNodes}
        {expansionNodes}
      </div>
    </div>
  );
};

export default ChangeView;

ChangeView.propTypes = {
  relocatedTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  expansionTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
  onUndoRelocation: PropTypes.func.isRequired,
  onUndoExpansion: PropTypes.func.isRequired,
};
