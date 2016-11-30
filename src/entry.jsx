var React = require("react");
var ReactDOM = require("react-dom");

require("./global/_global.scss");

var DivisionizerController = require("./containers/divisionizercontroller");

function initialize(container_id, conferences, divisions) {
	ReactDOM.render(
		<DivisionizerController initConferences={conferences} initDivisions={divisions} />,
		document.getElementById(container_id)
    ); 
}

initialize("container", 2, 4);