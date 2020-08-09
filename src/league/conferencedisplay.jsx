import React from 'react';
import PropTypes from 'prop-types';
import Division from './divisiondisplay';
import './_conferencedisplay.scss';

const ConferenceDisplay = (props) => {
  const onDrag = (teamId, divId) => {
    props.onDrag(teamId, divId);
  };

  const previousDivisions = props.number * props.conference.length;
  const divisionNodes = props.conference.map((division, index) => (
    <Division
      division={division}
      id={index + previousDivisions}
      key={division.name}
      count={props.conference.length * props.count}
      conference={props.number}
      number={index}
      onDrag={onDrag}
    />
  ));

  const className = `conference conference-number${props.number}`;
  return <div className={className}>{divisionNodes}</div>;
};

export default ConferenceDisplay;

ConferenceDisplay.propTypes = {
  conference: PropTypes.arrayOf(PropTypes.array).isRequired,
  count: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  onDrag: PropTypes.func.isRequired,
};
