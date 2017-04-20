import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import MarkerIcon from './markericon';
import MarkerBackground from './markerbackground';

import mapStyle from './mapstyle.json';
import style from './_map.scss';

function getMarkers(league) {
  const markers = [];

  const isSingleConference = (league.length === 1);

  for (let c = 0; c < league.length; c++) {
    const conference = league[c];
    for (let d = 0; d < conference.length; d++) {
      const division = conference[d];

      for (let t = 0; t < division.length; t++) {
        const team = division[t];

        markers.push(
          <MarkerBackground
            team={team}
            conference={c}
            division={d}
            singleConference={isSingleConference}
            key={`bg${team.id}`}
          />,
        );

        markers.push(<MarkerIcon team={team} key={`icon${team.id}`} />);
      }
    }
  }

  return markers;
}

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={4}
    maxZoom={6}
    minZoom={3}
    defaultCenter={{ lat: 41, lng: -96 }}
    options={{ mapTypeControl: false, streetViewControl: false, styles: mapStyle }}
  >
    {getMarkers(props.league)}
  </GoogleMap>
));

Map.propTypes = {
  league: React.PropTypes.arrayOf(Array),
};

export default Map;
