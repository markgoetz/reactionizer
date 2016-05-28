var distance_costs = new Array();
var rivalry_costs;
var timezone_costs = new Array();
var division_costs = new Array();
var costs = new Array();
var division_count;
var global_cities;
var global_teams;
var global_next_empty_division = -4;
var global_relocated_teams = new Array();

var DIVISION_WEIGHT_MODIFIER = 1;
var RIVALRY_WEIGHT_MODIFIER  = 2;
var DISTANCE_WEIGHT_MODIFIER = 9;
var TIMEZONE_WEIGHT_MODIFIER = 3;

static_teams = [
	{city:'Anaheim',name:'Ducks', lat:33.807778,lon:-117.876667,orig_div:0,tz:3},
	{city:'Dallas',name:'Stars',lat:32.790556, lon:-96.810278,orig_div:0,tz:1},
	{city:'Los Angeles',name:'Kings',lat:34.043056, lon:-118.267222,orig_div:0,tz:3}, 
	{city:'Phoenix',name:'Coyotes',lat:33.531944, lon:-112.261111,orig_div:0,tz:2},
	{city:'San Jose',name:'Sharks',lat:37.332778, lon:-121.901111,orig_div:0,tz:3},	
	{city:'Calgary',name:'Flames',lat:51.0375, lon:-114.051944,orig_div:1,tz:2},
	{city:'Colorado',name:'Avalanche',lat:39.748611, lon:-105.0075,orig_div:1,tz:2},
	{city:'Edmonton',name:'Oilers',lat:53.571389, lon:-113.456111,orig_div:1,tz:2},
	{city:'Minnesota',name:'Wild',lat:44.944722, lon:-93.101111,orig_div:1,tz:1},
	{city:'Vancouver',name:'Canucks',lat:49.277778, lon:-123.108889,orig_div:1,tz:3},
	{city:'Columbus',name:'Blue Jackets',lat:39.969283, lon:-83.006111,orig_div:2,tz:0},
	{city:'Chicago',name:'Blackhawks',lat:41.880556, lon:-87.674167,orig_div:2,tz:1},
	{city:'Detroit',name:'Red Wings',lat:42.325278, lon:-83.051389,orig_div:2,tz:0},
	{city:'Nashville',name:'Predators',lat:36.159167, lon:-86.778611,orig_div:2,tz:1},
	{city:'St. Louis',name:'Blues',lat:38.626667, lon:-90.2025,orig_div:2,tz:1},
	{city:'Boston',name:'Bruins',lat:42.366303, lon:-71.062228,orig_div:3,tz:0},
	{city:'Buffalo',name:'Sabres',lat:42.875, lon:-78.876389,orig_div:3,tz:0},
	{city:'Montreal',name:'Canadiens',lat:45.496111, lon:-73.569444,orig_div:3,tz:0},
	{city:'Ottawa',name:'Senators',lat:45.296944, lon:-75.927222,orig_div:3,tz:0},
	{city:'Toronto',name:'Maple Leafs',lat:43.643333, lon:-79.379167,orig_div:3,tz:0},
	{city:'New Jersey',name:'Devils',lat:40.733611, lon:-74.171111,orig_div:4,tz:0},
	{city:'New York',name:'Islanders',lat:40.722778, lon:-73.590556,orig_div:4,tz:0},
	{city:'New York',name:'Rangers',lat:40.750556, lon:-73.993611,orig_div:4,tz:0},
	{city:'Philadelphia',name:'Flyers',lat:39.901111, lon:-75.171944,orig_div:4,tz:0},
	{city:'Pittsburgh',name:'Penguins',lat:40.439444, lon:-79.989167,orig_div:4,tz:0},
	{city:'Carolina',name:'Hurricanes',lat:35.803333, lon:-78.721944,orig_div:5,tz:0},
	{city:'Florida',name:'Panthers',lat:26.158333, lon:-80.325556,orig_div:5,tz:0},
	{city:'Tampa Bay',name:'Lightning',lat:27.942778, lon:-82.451944,orig_div:5,tz:0},
	{city:'Washington',name:'Capitals',lat:38.898056, lon:-77.020833,orig_div:5,tz:0},
	{city:'Winnipeg',name:'Jets',lat:49.892892, lon:-97.143836,orig_div:-1,tz:1}	
];

global_cities = [
  	{city: 'Atlanta',tz:0, lat:33.755, lon:-84.39},
	{city: 'Hartford',tz:0, lat:41.762736, lon:-72.674286},
	{city: 'Hamilton',tz:0, lat:43.255278, lon:-79.873056},
	{city: 'Houston',tz:1, lat:29.762778, lon:-95.383056},
	{city: 'Kansas City',tz:1, lat:39.109722, lon:-94.588611},
	{city: 'Las Vegas',tz:3, lat:36.175, lon:-115.136389},
	{city: 'Milwaukee',tz:1, lat:43.0522222, lon:-87.955833},
	{city: 'Quebec City', tz:0, lat:46.816667, lon:-71.216667},
	{city: 'Seattle', tz:3, lat:47.609722, lon:-122.333056}
];

var static_rivalry_costs = [
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// ducks
[2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// stars
[1,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// kings
[2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// coyotes
[1,2,1,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// sharks
[2,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// flames
[3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// avalanche
[2,3,2,4,4,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// oilers
[3,2,3,4,3,3,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// wild
[3,2,3,4,3,2,3,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// canucks
[4,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// blue jackets
[3,3,3,4,2,4,4,4,3,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// blackhawks
[2,2,3,3,2,3,2,3,3,3,3,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// red wings
[3,3,3,4,3,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// predators
[4,3,3,4,4,4,4,4,4,4,3,1,1,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// blues
[4,4,4,4,3,4,4,4,4,3,4,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// bruins
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4],	// sabres
[4,4,3,4,4,3,4,3,4,3,4,2,1,4,3,0,2,4,4,4,4,4,4,4,4,4,4,4,4,4],	// canadiens
[3,4,4,4,4,3,4,3,4,3,4,4,4,4,4,3,2,2,4,4,4,4,4,4,4,4,4,4,4,4],	// senators
[4,4,4,4,4,3,4,3,4,3,4,2,1,4,4,0,1,0,2,4,4,4,4,4,4,4,4,4,4,4],	// maple leafs
[3,3,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4],	// devils
[4,4,4,4,4,4,4,3,4,4,4,3,4,4,4,4,3,3,4,4,2,4,4,4,4,4,4,4,4,4],	// islanders
[4,4,4,4,4,4,4,4,4,4,4,2,1,4,4,1,3,1,4,2,1,1,4,4,4,4,4,4,4,4],	// rangers
[4,4,4,4,4,4,4,4,4,4,4,2,4,4,4,2,3,2,3,4,1,2,1,4,4,4,4,4,4,4],	// philly
[4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,3,4,4,4,4,2,2,2,1,4,4,4,4,4,4],	// pittsburgh
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4],	// carolina
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4],	// florida
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,2,4,4,4],	// tampa
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,3,2,3,3,3,4,4],	// washington
[4,4,4,3,4,3,4,3,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]	// winnipeg
];


function initData() {
	// make a deep copy
	global_teams = new Array();
	for (var i = 0; i < static_teams.length; i++) {
		var team = static_teams[i];
		global_teams.push({city:team.city, name: team.name, lat:team.lat, lon:team.lon, tz:team.tz, orig_div:team.orig_div});
	}
	
	rivalry_costs = new Array();
	for (i = 0; i < static_rivalry_costs.length; i++) {
		var r = new Array();
		for (var j = 0; j < i; j++) {
			r.push(static_rivalry_costs[i][j] / 4.0);
		}
		rivalry_costs.push(r);
	}
	updateScoreMatrices(global_teams);
}

function updateScoreMatrices(teams) {
	var max_distance = 0.0;
	var max_timezone = 0.0;
	var max_division = 0.0;
	
	distance_costs = new Array();
	timezone_costs = new Array();
	division_costs = new Array();
	
	for (var i = 0; i < teams.length; i++) {
		distance_costs[i] = new Array();
		timezone_costs[i] = new Array();
		division_costs[i] = new Array();
		for (var j = 0; j < i; j++) {
			var team1 = teams[i];
			var team2 = teams[j];
			
			distance_costs[i][j] = getDistanceCost(team1, team2);
			if (distance_costs[i][j] > max_distance) max_distance = distance_costs[i][j];
			
			timezone_costs[i][j] = getTimeZoneCost(team1, team2);
			if (timezone_costs[i][j] > max_timezone) max_timezone = timezone_costs[i][j];
			
			division_costs[i][j] = getDivisionCost(team1, team2);
			if (division_costs[i][j] > max_division) max_division = division_costs[i][j];
		}
	}
	
	for (i = 0; i < teams.length; i++) {
		for (j = 0; j < i; j++) {
			distance_costs[i][j] = (distance_costs[i][j] / max_distance);
			timezone_costs[i][j] = (timezone_costs[i][j] / max_timezone);
			division_costs[i][j] = (division_costs[i][j] / max_division);
		}
	}
}

function getDistanceCost(team1, team2) {
	// convert to radians
	var lat1 = team1.lat * (Math.PI / 180);
	var lat2 = team2.lat * (Math.PI / 180);
	var lon1 = team1.lon * (Math.PI / 180);
	var lon2 = team2.lon * (Math.PI / 180);
	
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	return Math.sqrt(x*x + y*y);
}
	
function getTimeZoneCost(team1, team2) {
	return Math.abs(team1.tz - team2.tz);
}

function getDivisionCost(team1, team2) {
	if (team1.orig_div == team2.orig_div) return 0.0;
	else if (team1.orig_div % 3 == team2.orig_div % 3) return 2.0;
	return 3.0;
}

function updateCosts() {
	costs = new Array();
	
	var distance_weight = getDistanceWeight() * DISTANCE_WEIGHT_MODIFIER;
	var rivalry_weight  = getRivalryWeight()  * RIVALRY_WEIGHT_MODIFIER;
	var timezone_weight = getTimezoneWeight() * TIMEZONE_WEIGHT_MODIFIER;
	var division_weight = getDivisionWeight() * DIVISION_WEIGHT_MODIFIER;
	
	for (var i = 0; i < global_teams.length; i++) {
		costs[i] = new Array();
		for (var j = 0; j < i; j++) {
			costs[i][j] = distance_weight * distance_costs[i][j] +
				rivalry_weight * rivalry_costs[i][j] +
				timezone_weight * timezone_costs[i][j] +
				division_weight * division_costs[i][j];
		}
	}
}

function changeTeamCity(team, city) {
	global_teams[team].city = global_cities[city].city;
	global_teams[team].lat  = global_cities[city].lat;
	global_teams[team].lon  = global_cities[city].lon;
	global_teams[team].tz   = global_cities[city].tz;
	global_teams[team].orig_div = global_next_empty_division;
	global_next_empty_division -= 3;
	
	divisions = initDivisions();
	moveTeamMarker(team, global_cities[city].lat, global_cities[city].lon);
	updateTable(divisions);
	updateMap(divisions);
	updateScoreMatrices(global_teams);
	updateCosts();
	
	global_relocated_teams[team] = city;

	addMovedTeamRow(team, global_cities[city].city);
	setBookmark(divisions.string);
}

function revertTeamCity(team) {
	global_teams[team].city = static_teams[team].city;
	global_teams[team].lat  = static_teams[team].lat;
	global_teams[team].lon  = static_teams[team].lon;
	global_teams[team].tz   = static_teams[team].tz;	
	global_teams[team].orig_div = static_teams[team].orig_div;
	
	divisions = initDivisions();
	moveTeamMarker(team, static_teams[team].lat, static_teams[team].lon);
	updateTable(divisions);
	updateMap(divisions);
	updateScoreMatrices(global_teams);
	updateCosts();
	
	delete global_relocated_teams[team];
	setBookmark(divisions.string);
	
	removeMovedTeamRow(team);
}