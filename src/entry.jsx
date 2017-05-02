import React from 'react';
import ReactDOM from 'react-dom';

import styles from './global/_global.scss';

import DivisionizerController from './containers/divisionizercontroller';

function initialize(containerId, conferences, divisions) {
  ReactDOM.render(
    <DivisionizerController initConferences={conferences} initDivisions={divisions} />,
    document.getElementById(containerId),
  );
}

initialize('container', 2, 4);
