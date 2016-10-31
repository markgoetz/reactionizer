module.exports = function(data) {
	this.name = data.name;
	this.id = data.id;
	this.city = data.city;
	this.lat = data.lat;
	this.lon = data.lon;

	this.getLogoURL = function() {
		return "logos/" + this.name.toLowerCase().replace(" ", "") + ".svg";	
	};

	this.relocate = function(city) {
		this.city = city.city;
		this.lat = city.lat;
		this.lon = city.lon;
		this.relocated = true;
	};
};