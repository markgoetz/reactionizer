function QueryString() {
	this.set = function(string) {
		window.history.replaceState({}, "", "?" + string);
	};

	this.get = function() {
		return window.location.search.replace("?", "");
	};
}

module.exports = QueryString;