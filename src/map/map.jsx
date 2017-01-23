import React from 'react';
import { GoogleMapLoader, GoogleMapHolder, GoogleMap } from 'react-google-maps';
import MarkerIcon from './markericon';
import MarkerBackground from './markerbackground';

const mapStyle = require('./mapstyle.json');
require('./_map.scss');

export default class Map extends React.Component {
  _getMarkers(league) {
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
              mapHolderRef={this.props.mapHolderRef}
            />,
          );

          markers.push(<MarkerIcon team={team} key={`icon${team.id}`} mapHolderRef={this.props.mapHolderRef} />);
        }
      }
    }

    return markers;
  }

  _getMap() {
    return (
      <GoogleMap
        defaultZoom={4}
        maxZoom={6}
        minZoom={3}
        defaultCenter={{ lat: 41, lng: -96 }}
        options={{ mapTypeControl: false, streetViewControl: false, styles: mapStyle }}
      >
        {this._getMarkers(this.props.league)}
      </GoogleMap>);
  }

  render() {
    return <GoogleMapLoader containerElement={<div id="map" />} googleMapElement={this._getMap()} />;
  }
}

Map.propTypes = {
  league: React.PropTypes.arrayOf(Array),
  mapHolderRef: React.PropTypes.instanceOf(GoogleMapHolder),
};
