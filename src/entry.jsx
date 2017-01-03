import React from 'react';
import ReactDOM from 'react-dom';
import DivisionizerController from './containers/divisionizercontroller';

require('./global/_global.scss');

function initialize(containerId, conferences, divisions) {
  ReactDOM.render(
    <DivisionizerController initConferences={conferences} initDivisions={divisions} />,
    document.getElementById(containerId),
  );
}

initialize('container', 2, 4);
