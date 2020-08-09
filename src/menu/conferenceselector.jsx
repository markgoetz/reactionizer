import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SelectorButton from './selectorbutton';

const ConferenceSelector = (props) => {
  const [conferences, setConferences] = useState(props.conferences);
  const [divisions, setDivisions] = useState(props.divisions);

  const conferenceUpdate = (c) => {
    setConferences(c);
    let d = divisions;

    if (divisions % c !== 0) {
      d = 6;
      setDivisions(d);
    }

    props.onConferenceChange(c, d);
  };

  const divisionUpdate = (d) => {
    setDivisions(d);
    props.onConferenceChange(conferences, d);
  };

  const conferenceNodes = [3, 2, 1].map(
    conference => (
      <SelectorButton
        type="conference"
        key={`conference${conference}`}
        value={conference}
        selected={conference === conferences}
        disabled={false}
        onButtonClick={conferenceUpdate}
      />
    ),
  );

  const divisionNodes = [6, 4, 3, 2].map(
    division => (
      <SelectorButton
        type="division"
        key={`division${division}`}
        value={division}
        selected={division === divisions}
        disabled={division % conferences !== 0}
        onButtonClick={divisionUpdate}
      />
    ),
  );

  return (
    <div className="formgroup">
      <div className="form">
        <h3 className="form_heading">Conferences</h3>
        <div className="form_field">
          <div className="selectorcontainer">
            {conferenceNodes}
          </div>
        </div>
      </div>
      <div className="form">
        <h3 className="form_heading">Divisions</h3>
        <div className="form_field">
          <div className="selectorcontainer">
            {divisionNodes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceSelector;

ConferenceSelector.propTypes = {
  conferences: PropTypes.number.isRequired,
  divisions: PropTypes.number.isRequired,
  onConferenceChange: PropTypes.func.isRequired,
};
