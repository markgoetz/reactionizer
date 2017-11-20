import React from 'react';
import PropTypes from 'prop-types';

import ConferenceDisplay from './conferencedisplay';

import styles from './_leaguedisplay.scss';

export default class LeagueDisplay extends React.Component {
  onDrag = (teamId, divId) => {
    this.props.onDrag(teamId, divId);
  }

  render() {
    const nodes = this.props.league.map((conference, index) =>
      (<ConferenceDisplay
        conference={conference}
        key={index}
        number={index}
        count={this.props.league.length}
        onDrag={this.onDrag}
      />));

    const divisionCount = this.props.league.reduce(
      (a, b) => a + b.length,
      0,
    );
    const className = `league league-${divisionCount}div league-${this.props.league.length}conf`;
    return <div id="league" className={className}>{nodes}</div>;
  }
}

LeagueDisplay.propTypes = {
  league: PropTypes.arrayOf(PropTypes.array),
  onDrag: PropTypes.func,
};
