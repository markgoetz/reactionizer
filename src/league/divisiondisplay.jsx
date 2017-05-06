import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import TeamCard from './teamcard';
import DragTypes from '../global/dragtypes';
import Team from './team.model';

import styles from './_divisiondisplay.scss';

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
  render() {
    const teamNodes = this.props.division.map(team => <TeamCard team={team} key={team.name} />);
    const divisionClass = `division division-conf${this.props.conference} division-number${this.props.number}`;
    const nameClass = `division_name division_name-conf${this.props.conference}div${this.props.number}`;

    return this.props.connectDropTarget(<div className={divisionClass}>
      <div className={nameClass}>{this.props.division.name}</div>
      <div className="division_list">
        {teamNodes}
      </div>
    </div>);
  }
}

DivisionDisplay.propTypes = {
  // The ID prop is used in the drag/drop code.
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number.isRequired,
  division: PropTypes.arrayOf(PropTypes.instanceOf(Team)),
  conference: PropTypes.number,
  number: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  onDrag: PropTypes.func,
  connectDropTarget: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  canDrop: PropTypes.func,
};

module.exports = DropTarget(DragTypes.TEAM, spec, collect)(DivisionDisplay);
