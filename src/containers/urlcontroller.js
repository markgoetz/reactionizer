var jsURL = require("jsurl");

function _setURL(url_string) {
	window.location.search = url_string;
}

function _getURL() {
	return window.location.search;
}

function URLController() {
	this.update = function(data) {
		var leagues = data.leagues;
		var relocations = data.relocated_teams;
		var expansions = data.expansion_teams;

		var url_string = jsURL.stringify(
			{
				l: leagues,
				r: relocations,
				e: expansions
			}
		);

		_setURL(url_string);
	};

	this.getData = function() {
		var data;
		var url_string = _getURL();
		var response = jsURL.parse(url_string);

		data.leagues = response.l;
		data.relocations = response.r;
		data.expansions = response.e;

		return data;
	};
}

module.exports = URLController;