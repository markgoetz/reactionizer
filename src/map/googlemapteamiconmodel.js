var GoogleMapTeamIconModel = function(color) {
	return {
		path: "M -20 0 " +
			"A 20 20 0 0 0  20 0" +
			"A 20 20 0 0 0 -20 0",
		fillColor: color,
		fillOpacity: .9,
		strokeWeight: 0
	};
};

module.exports = GoogleMapTeamIconModel;