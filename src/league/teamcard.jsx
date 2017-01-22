import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import DragTypes from '../global/dragtypes';
import Team from './team.model';
import { TeamLogoComponent } from '../global/teamlogo';

require('./_teamcard.scss');

const dragSpec = {
  beginDrag(props) {
    return { team: props.team };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class TeamCard extends React.Component {
  render() {
    const source = this.props.team.getLogoID();

    let additionalClass = '';
    if (this.props.team.relocated) {
      additionalClass = ' moved';
    }
    if (this.props.team.expansion) {
      additionalClass = ' created';
    }

    return this.props.connectDragSource(<div className={`team${additionalClass}`}>
      <TeamLogoComponent className="team-logo" id={source} />
      <span className="city">{this.props.team.city}</span>
      <span className="name">&nbsp;{this.props.team.name}</span>
    </div>);
  }
}

export default (DragSource(DragTypes.TEAM, dragSpec, collect)(TeamCard));

TeamCard.propTypes = {
  team: PropTypes.instanceOf(PropTypes.instanceOf(Team)),
  // eslint-disable-next-line react/no-unused-prop-types
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};
