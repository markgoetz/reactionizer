var global_teams;
var static_teams;
var global_cities;

static_teams = [
	{city: "Anaheim",name:"Ducks", lat:33.807778,lon:-117.876667,orig_div:0,tz:3},
	{city: "Dallas",name:"Stars",lat:32.790556, lon:-96.810278,orig_div:0,tz:1},
	{city: "Los Angeles",name:"Kings",lat:34.043056, lon:-118.267222,orig_div:0,tz:3}, 
	{city: "Phoenix",name:"Coyotes",lat:33.531944, lon:-112.261111,orig_div:0,tz:2},
	{city: "San Jose",name:"Sharks",lat:37.332778, lon:-121.901111,orig_div:0,tz:3},	
	{city: "Calgary",name:"Flames",lat:51.0375, lon:-114.051944,orig_div:1,tz:2},
	{city: "Colorado",name:"Avalanche",lat:39.748611, lon:-105.0075,orig_div:1,tz:2},
	{city: "Edmonton",name:"Oilers",lat:53.571389, lon:-113.456111,orig_div:1,tz:2},
	{city: "Minnesota",name:"Wild",lat:44.944722, lon:-93.101111,orig_div:1,tz:1},
	{city:"Vancouver",name:"Canucks",lat:49.277778, lon:-123.108889,orig_div:1,tz:3},
	{city:"Columbus",name:"Blue Jackets",lat:39.969283, lon:-83.006111,orig_div:2,tz:0},
	{city:"Chicago",name:"Blackhawks",lat:41.880556, lon:-87.674167,orig_div:2,tz:1},
	{city:"Detroit",name:"Red Wings",lat:42.325278, lon:-83.051389,orig_div:2,tz:0},
	{city:"Nashville",name:"Predators",lat:36.159167, lon:-86.778611,orig_div:2,tz:1},
	{city:"St. Louis",name:"Blues",lat:38.626667, lon:-90.2025,orig_div:2,tz:1},
	{city:"Boston",name:"Bruins",lat:42.366303, lon:-71.062228,orig_div:3,tz:0},
	{city:"Buffalo",name:"Sabres",lat:42.875, lon:-78.876389,orig_div:3,tz:0},
	{city:"Montreal",name:"Canadiens",lat:45.496111, lon:-73.569444,orig_div:3,tz:0},
	{city:"Ottawa",name:"Senators",lat:45.296944, lon:-75.927222,orig_div:3,tz:0},
	{city:"Toronto",name:"Maple Leafs",lat:43.643333, lon:-79.379167,orig_div:3,tz:0},
	{city:"New Jersey",name:"Devils",lat:40.733611, lon:-74.171111,orig_div:4,tz:0},
	{city:"New York",name:"Islanders",lat:40.722778, lon:-73.590556,orig_div:4,tz:0},
	{city:"New York",name:"Rangers",lat:40.750556, lon:-73.993611,orig_div:4,tz:0},
	{city:"Philadelphia",name:"Flyers",lat:39.901111, lon:-75.171944,orig_div:4,tz:0},
	{city:"Pittsburgh",name:"Penguins",lat:40.439444, lon:-79.989167,orig_div:4,tz:0},
	{city:"Carolina",name:"Hurricanes",lat:35.803333, lon:-78.721944,orig_div:5,tz:0},
	{city:"Florida",name:"Panthers",lat:26.158333, lon:-80.325556,orig_div:5,tz:0},
	{city:"Tampa Bay",name:"Lightning",lat:27.942778, lon:-82.451944,orig_div:5,tz:0},
	{city:"Washington",name:"Capitals",lat:38.898056, lon:-77.020833,orig_div:5,tz:0},
	{city:"Winnipeg",name:"Jets",lat:49.892892, lon:-97.143836,orig_div:-1,tz:1},
	{city:"Las Vegas",name:"Expansions",lat:36.175, lon:-115.136389,orig_div:-1,tz:3}
];

global_cities = [
	{city: "Atlanta",tz:0, lat:33.755, lon:-84.39},
	{city: "Hartford",tz:0, lat:41.762736, lon:-72.674286},
	{city: "Hamilton",tz:0, lat:43.255278, lon:-79.873056},
	{city: "Houston",tz:1, lat:29.762778, lon:-95.383056},
	{city: "Kansas City",tz:1, lat:39.109722, lon:-94.588611},
	{city: "Milwaukee",tz:1, lat:43.0522222, lon:-87.955833},
	{city: "Quebec City", tz:0, lat:46.816667, lon:-71.216667},
	{city: "Seattle", tz:3, lat:47.609722, lon:-122.333056}
];

function initData() {
	// make a deep copy
	global_teams = new Array();
	for (var i = 0; i < static_teams.length; i++) {
		var team = static_teams[i];
		global_teams.push({city:team.city, name: team.name, lat:team.lat, lon:team.lon, tz:team.tz, orig_div:team.orig_div});
	}
}