import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';
import Team from '../league/team.model';
import GoogleMapTeamIconModel from './googlemapteamiconmodel';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
const conferenceColors = require('!!sass-variables-loader!../global/_conferencecolors.scss');

function getColor(conference, division) {
  return conferenceColors[`c${conference}d${division}color`];
}

export default function MarkerBackground(props) {
  let color;

  if (!props.singleConference) {
    color = getColor(props.conference, props.division);
  } else {
    color = getColor(props.division, 0);
  }

  const iconBackground = new GoogleMapTeamIconModel(color);

  return (<Marker
    position={{ lat: props.team.lat, lng: props.team.lon }}
    icon={iconBackground}
    title={props.team.name}
    zIndex={-99}
  />);
}

MarkerBackground.propTypes = {
  team: PropTypes.instanceOf(Team).isRequired,
  division: PropTypes.number.isRequired,
  conference: PropTypes.number.isRequired,
  singleConference: PropTypes.bool.isRequired,
};
