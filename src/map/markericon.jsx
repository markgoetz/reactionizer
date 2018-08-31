import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import Team from '../league/team.model';
import { TeamLogoInline } from '../global/teamlogo';

export default function MarkerIcon(props) {
  const teamId = props.team.getLogoID();
  return (<Marker
    position={{ lat: props.team.lat, lng: props.team.lon }}
    icon={{
      url: `data:image/svg+xml;utf-8,${TeamLogoInline(teamId)}`,
      anchor: { x: 15, y: 15 },
      size: { height: 30, width: 30 },
    }}
    title={props.team.name}
    zIndex={2}
  />);
}

MarkerIcon.propTypes = {
  team: PropTypes.instanceOf(Team).isRequired,
};
