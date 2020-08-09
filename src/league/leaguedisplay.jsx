import React from 'react';
import PropTypes from 'prop-types';

import ConferenceDisplay from './conferencedisplay';

import './_leaguedisplay.scss';

const LeagueDisplay = (props) => {
  const onDrag = (teamId, divId) => {
    props.onDrag(teamId, divId);
  };

  const nodes = props.league.map((conference, index) => (
    <ConferenceDisplay
      conference={conference}
      key={index}
      number={index}
      count={props.league.length}
      onDrag={onDrag}
    />
  ));

  const divisionCount = props.league.reduce(
    (a, b) => a + b.length,
    0,
  );
  const className = `league league-${divisionCount}div league-${props.league.length}conf`;
  return <div id="league" className={className}>{nodes}</div>;
};

export default LeagueDisplay;

LeagueDisplay.propTypes = {
  league: PropTypes.arrayOf(PropTypes.array).isRequired,
  onDrag: PropTypes.func.isRequired,
};
