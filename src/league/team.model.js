var max_id = 0;

var Team = function(data, expansion) {
	this.name = data.name;
	this.id = max_id++;
	this.city = data.city;
	this.lat = data.lat;
	this.lon = data.lon;
	this.expansion = expansion;

	this.getLogoURL = function() {
		if (!this.expansion)
			return "logos/" + this.name.toLowerCase().replace(" ", "") + ".svg";	
		else
			return "logos/knights.svg";
	};

	this.relocate = function(city) {
		this.city = city.city;
		this.lat = city.lat;
		this.lon = city.lon;
		this.relocated = true;
	};
};

module.exports = Team;