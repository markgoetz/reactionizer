import React, { Component, PropTypes } from 'react';
import City from '../containers/city.model';

require('./_actionbutton.scss');

export default class Expansionizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: 0,
    };
  }

  onExpand = () => {
    this.props.onExpansion(this.state.name, this.state.city);
    this.setState({ name: '' });
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onCitySelect = (event) => {
    this.setState({ city: event.target.value });
  }

  render() {
    const cityNodes = this.props.cities.map(
      city => <option key={city.id} value={city.id}>{city.name}</option>,
    );

    return (<div className="form">
      <h3 className="form_heading">Create team</h3>
      <div className="field">
        <label htmlFor="expand_city" className="field_label">city</label>
        <select id="expand_city" value={this.state.city} onChange={this.onCitySelect} className="field_item">
          {cityNodes}
        </select>
      </div>
      <div className="field">
        <label htmlFor="expand_name" className="field_label">name</label>
        <input id="expand_name" type="text" value={this.state.name} onChange={this.onNameChange} className="field_item" />
      </div>
      <div><button className="actionbutton" onClick={this.onExpand}>Create Team</button></div>
    </div>);
  }
}

Expansionizer.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
  onExpansion: PropTypes.func.isRequired,
};
