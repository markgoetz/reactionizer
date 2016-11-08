var jsURL = require("jsurl");

var Serializer = function() {
	var compressLeagueString = function(string) {
		return string;
	};

	var decompressLeagueString = function(string) {
		return string;
	};

	this.serialize = function(leagues, relocations, expansions) {
		var data = {};

		leagues.splice(0,2);

		data.l = leagues.map(function(s) {
			return compressLeagueString(s);
		});
		data.r = relocations.map(function(t) {
			return [ t.id, t.cityid ];
		});
		data.e = expansions.map(function(t) {
			return [ t.name, t.cityid ];
		});

		return jsURL.stringify(data);
	};

	this.deserialize = function(string) {
		var data = jsURL.parse(string);
		if (!data) return {};

		var response = {};

		response.leagues = data.l.map(function(s) {
			return decompressLeagueString(s);
		});
		response.leagues.unshift(null,null);
		response.relocations = data.r.map(function(d) {
			return { id: d[0], city: d[1] };
		});
		response.expansions = data.e.map(function(d) {
			return { name: d[0], city: d[1] };
		});
		
		return response;
	};
};

module.exports = Serializer;