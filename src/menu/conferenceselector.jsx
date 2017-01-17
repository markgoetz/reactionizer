import React from 'react';
import SelectorButton from './selectorbutton';

export default class ConferenceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: props.conferences,
      divisions: props.divisions,
    };
  }

  conferenceUpdate = (c) => {
    this.setState({ conferences: c });
    let d = this.state.divisions;

    if (this.state.divisions % c !== 0) {
      d = 6;
      this.setState({ divisions: d });
    }

    this.props.onConferenceChange(c, d);
  }
  divisionUpdate = (d) => {
    this.setState({ divisions: d });
    this.props.onConferenceChange(this.state.conferences, d);
  }
  render() {
    const conferenceNodes = [3, 2, 1].map(
      conference => (<SelectorButton
        type="conference"
        key={`conference${conference}`}
        value={conference}
        selected={conference === this.state.conferences}
        disabled={false}
        onButtonClick={this.conferenceUpdate}
      />),
    );
    const divisionNodes = [6, 4, 3, 2].map(
      division => (<SelectorButton
        type="division"
        key={`division${division}`}
        value={division}
        selected={division === this.state.divisions}
        disabled={division % this.state.conferences !== 0}
        onButtonClick={this.divisionUpdate}
      />),
    );

    return (<div className="fieldgroup">
      <div className="field">
        <h3>Conferences</h3>
        <div className="subfield">
          <div className="selector-container">
            {conferenceNodes}
          </div>
        </div>
      </div>

      <div className="field">
        <h3>Divisions</h3>
        <div className="subfield">
          <div className="selector-container">
            {divisionNodes}
          </div>
        </div>
      </div>
    </div>);
  }
}

ConferenceSelector.propTypes = {
  conferences: React.PropTypes.number,
  divisions: React.PropTypes.number,
  onConferenceChange: React.PropTypes.func,
};
