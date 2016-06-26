var DL_DIVISION_MULTIPLIER = 3;
var costs;
var global_teams;
var DL_ENCODING_CHARS = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DL_DEFAULT_STRING = "IJCGRQFH9T72DEBOAPSNLKM1468053UVWXYZ";
var DL_ENCODING_BREAK_CHAR = ' ';
var DL_MAX_MUTATIONS = 2;

function DivisionList(div_string, conference_count, division_count) {
	this.string = div_string;
	this.div_count = division_count;
	this.conf_count = conference_count;
	this.score = 0;
}

DivisionList.prototype.calculateScore = function() {
	this.score = 0;
	var multiplier;
	
	for (var i = 0; i < global_teams.length; i++) {
		for (var j = 0; j < i; j++) {
			if (this.inSameDivision(i, j)) {
				multiplier = DL_DIVISION_MULTIPLIER;
			}
			else if (this.inSameConference(i, j)) {
				multiplier = 1;
			}
			else {
				continue;
			}
			
			this.score += multiplier * costs[i][j];
		}
	}
};

DivisionList.prototype.crossWith = function(otherDivision) {
	var chars_already_used = new Array();
	var unused_chars = DivisionList.getDefaultString();
	var new_string = '';
	var new_char;
	
	// splice the two divisions together
	for (var i = 0; i < this.string.length; i++) {
		var this_char = this.string.charAt(i);
		var other_char = otherDivision.string.charAt(i);
		if (chars_already_used[this_char] && !chars_already_used[other_char]) {
			new_char = other_char;
		}
		else if (chars_already_used[other_char] && !chars_already_used[this_char]) {
			new_char = this_char;
		}
		else  {
			if (Math.random() > .5) {
				new_char = this.string.charAt(i);
			}
			else {
				new_char = otherDivision.string.charAt(i);
			}
		}
		
		// check to see if there are any errors
		if (chars_already_used[new_char]) {
			new_string = new_string + DL_ENCODING_BREAK_CHAR;
		}
		else {
			new_string = new_string + new_char;
			chars_already_used[new_char] = 1;
			unused_chars = unused_chars.setCharAt(unused_chars.indexOf(new_char), '');
		}
	}
	
	var break_pos = new_string.indexOf(DL_ENCODING_BREAK_CHAR, 0);
	while (break_pos > -1) {
		var random_missing_char_pos = randomInt(unused_chars.length);
		var random_missing_char = unused_chars.charAt(random_missing_char_pos);
		new_string = new_string.setCharAt(break_pos, random_missing_char);
		unused_chars = unused_chars.setCharAt(random_missing_char_pos, '');
		break_pos = new_string.indexOf(DL_ENCODING_BREAK_CHAR, 0);
	}
	
	return new DivisionList(new_string, this.conf_count, this.div_count);
};

DivisionList.prototype.mutate = function() {
	var m;
	var mutations = randomInt(DL_MAX_MUTATIONS) + 1;
	
	for (m = 0; m < mutations; m++) {
		var i = randomInt(this.string.length);
		var team1_number = DL_ENCODING_CHARS.indexOf(this.string.charAt(i));
		
		var j, team2_number;
		do {
			j = randomInt(this.string.length);
			team2_number = DL_ENCODING_CHARS.indexOf(this.string.charAt(j));
		} while (this.inSameDivision(team1_number, team2_number));
	
		this.string = this.string.swapChars(i, j);
	}
	
	delete this.score;
	delete this.conferences;
};

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

DivisionList.prototype.inSameDivision = function(team1, team2) {
	var team1_char = DL_ENCODING_CHARS.charAt(team1);
	var team2_char = DL_ENCODING_CHARS.charAt(team2);
	
	if (!this.conferences)
		this._breakdownDivisions();
	
	for (var i = 0; i < this.conferences.length; i++) {
		var conference = this.conferences[i];
		for (var j = 0; j < conference.length; j++) {
			var division = conference[j];
			if (division.indexOf(team1_char) > -1 && division.indexOf(team2_char) > -1)
				return true;
		}
	}
	return false;
}

DivisionList.prototype.inSameConference = function(team1, team2) {
	var team1_char = DL_ENCODING_CHARS.charAt(team1);
	var team2_char = DL_ENCODING_CHARS.charAt(team2);
	
	if (!this.conferences)
		this._breakdownDivisions();
	
	var found1_flag, found2_flag;
	
	for (var i = 0; i < this.conferences.length; i++) {
		found1_flag = false; found2_flag = false;
		var conference = this.conferences[i];
		for (var j = 0; j < conference.length; j++) {
			var division = conference[j];
			if (division.indexOf(team1_char) > -1) {
				found1_flag = true;
				if (found2_flag) return true;
			}
			if (division.indexOf(team2_char) > -1) {
				found2_flag = true;
				if (found1_flag) return true;
			}
		}
	}
	return false;
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
}

DivisionList.getRandom = function(conference_count, division_count) {
	// take a list of all the teams that we have
	var team_string = DL_ENCODING_CHARS.substring(0, global_teams.length);
	
	// shuffle the list randomly
	for (var i = team_string.length - 1; i >= 1; i--) {
		var j = randomInt(i);
		
		team_string = team_string.swapChars(i, j);
	}
	
	return new DivisionList(team_string, conference_count, division_count);
};

DivisionList.getDefaultString = function() {
	return DL_DEFAULT_STRING.substring(0, global_teams.length);
};