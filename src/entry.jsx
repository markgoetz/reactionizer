import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import './global/_global.scss';

import DivisionizerController from './containers/divisionizercontroller';

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_KEY);

function initialize(containerId, conferences, divisions) {
  ReactDOM.render(
    <DivisionizerController initConferences={conferences} initDivisions={divisions} />,
    document.getElementById(containerId),
  );
}

initialize('container', 2, 4);
