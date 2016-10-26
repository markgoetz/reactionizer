var React = require("react");
var SelectorButton = require("./selectorbutton");

var ConferenceSelector = React.createClass({
	propTypes: {
		conferences: React.PropTypes.number,
		divisions: React.PropTypes.number,
		onConferenceChange: React.PropTypes.func
	},
	getInitialState: function() {
		return {conferences:this.props.conferences,divisions:this.props.divisions};
	},
	render: function() {
		var conference_nodes = [3,2,1].map(function(conference) {
			return (
        <SelectorButton
          type="conference"
          key={"conference"+conference}
          value={conference}
          selected={conference==this.state.conferences}
          disabled={false}
          onButtonClick={this.conferenceUpdate} />
        );
		},
      this
    );
		var division_nodes = [6,4,3,2].map(function(division) {
			return (
        <SelectorButton
          type="division"
          key={"division"+division}
          value={division}
          selected={division==this.state.divisions}
          disabled={division % this.state.conferences != 0} 
          onButtonClick={this.divisionUpdate} />
        );
		},
      this
    );

		return (<div>
      <div className="field">
        <h3>Conferences</h3>
        <div className="subfield">
          <div className="selector-container">
            {conference_nodes}
          </div>
        </div>
      </div>
      
      <div className="field">
        <h3>Divisions</h3>  
        <div className="subfield">
          <div className="selector-container">
            {division_nodes}
          </div>
        </div>
      </div>
    </div>);
	},
	conferenceUpdate: function(c) {
		this.setState({conferences:c});
		var d = this.state.divisions;

		if (this.state.divisions % c != 0) {
			d = 6;
			this.setState({divisions:d});
		}

		this.props.onConferenceChange(c, d);
	},
	divisionUpdate: function(d) {
		this.setState({divisions:d});
		this.props.onConferenceChange(this.state.conferences, d);
	}
});	

module.exports = ConferenceSelector;