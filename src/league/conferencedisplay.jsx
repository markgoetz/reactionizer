import React, { PropTypes } from 'react';
import Division from './divisiondisplay';

require('./_conferencedisplay.scss');

export default class ConferenceDisplay extends React.Component {
  static propTypes = {
    conference: PropTypes.array,
    count: PropTypes.number,
    number: PropTypes.number,
    onDrag: PropTypes.func,
  }
  onDrag(teamId, divId) {
    this.props.onDrag(teamId, divId);
  }
  render() {
    const divisionNodes = this.props.conference.map((division, index) =>
      (<Division
        division={division}
        key={index}
        count={this.props.conference.length * this.props.count}
        conference={this.props.number}
        number={index}
        onDrag={this.onDrag}
      />),
    );

    const className = `conference col-${this.props.count}`;
    return <div className={className}>{divisionNodes}</div>;
  }
}
