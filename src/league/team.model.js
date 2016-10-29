module.exports = function(data) {
	this.name = data.name;
	this.id = data.id;
	this.city = data.city;
	this.lat = data.lat;
	this.lon = data.lon;

	this.getLogoURL = function() {
		return "logos/" + this.name.toLowerCase().replace(" ", "") + ".svg";	
	};
};