import React from 'react';
import PropTypes from 'prop-types';
import ChangedTeamView from './changedteamview';
import HeaderWithButton from '../global/HeaderWithButton';
import Team from '../league/team.model';

require('./_changeview.scss');

export default class ChangeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  toggle = () => {
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

    const stateModifier = this.state.open ? 'open' : 'closed';
    const className = `changedteams_list changedteams_list-${stateModifier}`;
    const buttonLabel = this.state.open ? 'close' : 'open';
    const changeCountIndicator = (changeCount > 0) ? <span className="changedteams_count">{changeCount}</span> : '';

    return (<div className="changed_teams">
      <div className="changedteams_title">
        <HeaderWithButton title={['Changes', changeCountIndicator]} buttonLabel={buttonLabel} onClick={this.toggle} />
      </div>

      <div id="changelist" className={className}>
        {relocatedNodes}
        {expansionNodes}
      </div>
    </div>);
  }
}

ChangeView.propTypes = {
  relocatedTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  expansionTeams: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  onUndoRelocation: PropTypes.func.isRequired,
  onUndoExpansion: PropTypes.func.isRequired,
};
