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



function setBookmark(div_string) {
	div_string = global_conference_count + ":" + global_division_count + ":" + div_string;
	
	for (var i = 0; i < global_teams.length; i++) {
		if (global_relocated_teams[i]) {
			div_string += (":" + i + "^" + global_relocated_teams[i]);
		}
	}
	
	location.hash = "#" + div_string;
	$("#fb_share").attr("href", "http://www.facebook.com/sharer/sharer.php?u=http://www.divisionizer.com/%23" + div_string);
	$("#tw_share").attr("href", "http://www.twitter.com/home?status=http://www.divisionizer.com/%23" + div_string);
}

initialize("container", 2, 4);