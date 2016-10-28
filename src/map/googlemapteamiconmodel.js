var GoogleMapTeamIconModel = function(color) {
	return {
		path: "M -11 -9 " +
			"A 2 2 0 0 0 -9 -11 " +
			"L 9 -11 " +
			"A 2 2 0 0 0 11 -9 " +
			"L 11 9 " +
			"A 2 2 0 0 0 9 11 " +
			"L -9 11 " +
			"A 2 2 0 0 0 -11 9" +
			"L -11 -9",
		strokeWeight: 3,
		fillColor: color,
		strokeColor: color,
		fillOpacity: .75
	};
};

module.exports = GoogleMapTeamIconModel;