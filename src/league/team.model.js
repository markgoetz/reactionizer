var max_id = 0;

var Team = function(data, expansion) {
	this.name = data.name;
	this.city = data.city;
	this.lat = data.lat;
	this.lon = data.lon;
	this.expansion = expansion;

	this.id = max_id++;
	this.original_data = data;

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

	this.reset = function() {
		this.city = this.original_data.city;
		this.lat = this.original_data.lat;
		this.lon = this.original_data.lon;		
		this.relocated = false;
	};
};

module.exports = Team;