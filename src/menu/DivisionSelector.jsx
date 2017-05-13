import React, { PropTypes, Component } from 'react';
import SelectorButton from './selectorbutton';

export default class DivisionSelector extends Component {
  divisionUpdate = (d) => {
    this.props.onDivisionChange(d);
  }

  render() {
    const divisionNodes = [6, 4, 3, 2].map(
      division => (<SelectorButton
        type="division"
        key={division}
        value={division}
        selected={division === this.props.divisions}
        disabled={division % this.props.conferences !== 0}
        onButtonClick={this.divisionUpdate}
      />),
    );

    return (<div className="form">
      <h3 className="form_heading">Divisions</h3>
      <div className="form_field">
        <div className="selectorcontainer">
          {divisionNodes}
        </div>
      </div>
    </div>);
  }
}

DivisionSelector.propTypes = {
  conferences: PropTypes.number.isRequired,
  divisions: PropTypes.number.isRequired,
  onDivisionChange: PropTypes.func,
};
