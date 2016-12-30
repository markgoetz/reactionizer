import React from 'react';
import { Marker } from 'react-google-maps';
import Team from '../league/team.model';
import { Inline } from '../global/teamlogo';

export default function MarkerIcon(props) {
  const teamId = props.team.getLogoID();
  return (<Marker
    position={{ lat: props.team.lat, lng: props.team.lon }}
    icon={{
      url: `data:image/svg+xml;utf-8,${Inline(teamId)}`,
      anchor: { x: 15, y: 15 },
      size: { height: 30, width: 30 },
    }}
    title={props.team.name}
    zIndex={2}
    mapHolderRef={props.mapHolderRef}
  />);
}

MarkerIcon.propTypes = {
  team: React.PropTypes.instanceOf(Team).isRequired,
  mapHolderRef: React.PropTypes.object,
};
