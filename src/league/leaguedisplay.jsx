import React from 'react';

import ConferenceDisplay from './conferencedisplay';

require('./_leaguedisplay.scss');

export default class LeagueDisplay extends React.Component {
  onDrag(teamId, divId) {
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

    return <div id="league">{nodes}</div>;
  }
}

LeagueDisplay.propTypes = {
  league: React.PropTypes.arrayOf(Array),
  onDrag: React.PropTypes.func,
};
