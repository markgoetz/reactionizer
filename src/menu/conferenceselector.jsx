import React from 'react';
import SelectorButton from './selectorbutton';

export default class ConferenceSelector extends React.Component {
  conferenceUpdate = (c) => {
    this.props.onConferenceChange(c);
  }
  render() {
    const conferenceNodes = [3, 2, 1].map(
      conference => (<SelectorButton
        type="conference"
        key={conference}
        value={conference}
        selected={conference === this.props.conferences}
        disabled={false}
        onButtonClick={this.conferenceUpdate}
      />),
    );

    return (<div className="form">
      <h3 className="form_heading">Conferences</h3>
      <div className="form_field">
        <div className="selectorcontainer">
          {conferenceNodes}
        </div>
      </div>
    </div>);
  }
}

ConferenceSelector.propTypes = {
  conferences: React.PropTypes.number.isRequired,
  onConferenceChange: React.PropTypes.func,
};
