import React, { PropTypes } from 'react';
import ChangedTeamView from './changedteamview';

require('./_changeview.scss');

export default class ChangeView extends React.Component {
  static propTypes = {
    relocatedTeams: PropTypes.array,
    expansionTeams: PropTypes.array,
    onUndoRelocation: PropTypes.func.isRequired,
    onUndoExpansion: PropTypes.func.isRequired,
  }
  getInitialState() {
    return { open: false };
  }
  toggle() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const changeCount = this.props.relocatedTeams.length + this.props.expansionTeams.length;

    const relocatedNodes = this.props.relocatedTeams.map(
      team => (<ChangedTeamView
        key={team.id}
        team={team}
        onClick={this.props.onUndoRelocation}
        type={'relocation'}
      />),
    );

    const expansionNodes = this.props.expansionTeams.map(
      team => (<ChangedTeamView
        key={team.id}
        team={team}
        onClick={this.props.onUndoExpansion}
        type={'expansion'}
      />),
    );

    const className = this.state.open ? 'open' : 'closed';
    const buttonLabel = this.state.open ? 'close' : 'open';

    const changeCountIndicator = (changeCount > 0) ? <span className="changeCount">{changeCount}</span> : '';

    return (<div className="changed_teams">
      <h3>
        <span>Changes</span>
        {changeCountIndicator}
        <div className="button_container"><button onClick={this.toggle} disabled={changeCount === 0}>{buttonLabel}</button></div>
      </h3>

      <div id="changelist" className={className}>
        {relocatedNodes}
        {expansionNodes}
      </div>
    </div>);
  }
}
