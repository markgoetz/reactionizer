var global_teams;
var DL_ENCODING_CHARS = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DL_DEFAULT_STRING = "IJCGRQFH9T72DEBOAPSNLKM1468053UVWXYZ";

function DivisionList(div_string, conference_count, division_count) {
	this.string = div_string;
	this.div_count = division_count;
	this.conf_count = conference_count;
}

DivisionList.prototype.toArray = function() {
	if (!this.conferences)
		this._breakdownDivisions();
	
	var conference_array = new Array();
	
	for (var i = 0; i < this.conferences.length; i++) {
		conference_array.push(new Array());
		var conference = this.conferences[i];
		for (var j = 0; j < conference.length; j++) {
			var division = conference[j];
			
			var division_array = new Array();
			for (var k = 0; k < division.length; k++) {
				var team_index = DL_ENCODING_CHARS.indexOf(division.charAt(k), 0);
				division_array.push(global_teams[team_index]);
			}
			
			conference_array[i][j] = division_array;
		}
	}
	return conference_array;
};

DivisionList.prototype._breakdownDivisions = function() {
	var _divisions, _conferences;
	if (this.div_count == 6) {
		_divisions = new Array(
			this.string.substring(0, 5),
			this.string.substring(5, 10),
			this.string.substring(10, 15),
			this.string.substring(15, 20),
			this.string.substring(20, 25),
			this.string.substring(25, 31)		
		);
	}
	
	else if (this.div_count == 4) {
		_divisions = new Array(
			this.string.substring(0, 8),
			this.string.substring(8, 15),
			this.string.substring(15, 23),
			this.string.substring(23, 31)
		);
	}
	
	else if (this.div_count == 3) {
		_divisions = new Array(
			this.string.substring(0, 10),
			this.string.substring(10, 20),
			this.string.substring(20, 31)
		);
	}
	
	else if (this.div_count == 2) {
		_divisions = new Array(
			this.string.substring(0, 15),
			this.string.substring(15, 31)
		);
	}
	
	var divisions_per_conference = this.div_count / this.conf_count;
	_conferences = new Array();
	for (var i = 0; i < this.conf_count; i++) {
		_conferences[i] = new Array();
		
		
		for (var j = i * divisions_per_conference; j < (i + 1) * divisions_per_conference; j++) {
			_conferences[i].push(_divisions[j]);
		}
	}
	
	this.conferences = _conferences;
	
	return _conferences;
};

DivisionList.getDefaultString = function() {
	return DL_DEFAULT_STRING.substring(0, global_teams.length);
};