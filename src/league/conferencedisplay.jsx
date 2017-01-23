import React, { PropTypes } from 'react';
import Division from './divisiondisplay';

require('./_conferencedisplay.scss');

export default class ConferenceDisplay extends React.Component {
  onDrag = (teamId, divId) => {
    this.props.onDrag(teamId, divId);
  }
  render() {
    const previousDivisions = this.props.number * this.props.conference.length;
    const divisionNodes = this.props.conference.map((division, index) =>
      (<Division
        division={division}
        id={index + previousDivisions}
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

ConferenceDisplay.propTypes = {
  conference: PropTypes.arrayOf(PropTypes.array),
  count: PropTypes.number,
  number: PropTypes.number,
  onDrag: PropTypes.func,
};
