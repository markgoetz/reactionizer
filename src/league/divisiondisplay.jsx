import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import TeamCard from './teamcard';
import DragTypes from '../global/dragtypes';

require('./_divisiondisplay.scss');

const spec = {
  drop(props, monitor, component) {
    const team = monitor.getItem().team;
    component.props.onDrag(team.id, props.id);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop,
  };
}

class DivisionDisplay extends React.Component {
  static propTypes = {
    division: PropTypes.array,
    count: PropTypes.number,
    conference: PropTypes.number,
    number: PropTypes.number,
    onDrag: PropTypes.func,
    connectDropTarget: PropTypes.func,
    canDrop: PropTypes.func,
  }
  render() {
    const teamNodes = this.props.division.map(team => <TeamCard team={team} key={team.name} />);

    const className = `division col-${this.props.count} conf-${this.props.conference} div-${this.props.number}`;
    return this.props.connectDropTarget(<div className={className}>
      <div className="name">{this.props.division.name}</div>
      <div className="list">
        {teamNodes}
      </div>
    </div>);
  }
}

module.exports = DropTarget(DragTypes.TEAM, spec, collect)(DivisionDisplay);
