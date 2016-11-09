var jsURL = require("jsurl");

var Serializer = function() {
	var compressLeagueString = function(string) {
		return string;
	};

	var decompressLeagueString = function(string) {
		return string;
	};

	this.serialize = function(conferences, divisions, league, relocations, expansions) {
		var data = [];

		data.push(conferences, divisions);

		data.push(compressLeagueString(league));

		data.push(relocations.map(function(t) {
			return [ t.id, t.cityid ];
		}));
		data.push(expansions.map(function(t) {
			return [ t.name, t.cityid ];
		}));

		return jsURL.stringify(data);
	};

	this.deserialize = function(string) {
		var data = jsURL.parse(string);
		if (!data) return {};

		var response = {};

		response.conferences = data[0];
		response.divisions = data[1];
		response.league = decompressLeagueString(data[2]);

		response.relocations = data[3].map(function(d) {
			return { id: d[0], city: d[1] };
		});
		response.expansions = data[4].map(function(d) {
			return { name: d[0], city: d[1] };
		});
		
		return response;
	};
};

module.exports = Serializer;