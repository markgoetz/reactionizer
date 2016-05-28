var GA_GENERATION_SIZE = 80;
var GA_MAX_SURVIVORS = 28;
var GA_MIN_SURVIVORS = 10;
var GA_SURVIVORS_DELTA = -.3;
var GA_MUTATION_CHANCE = .4;

var GA_ITERATION_INTERVAL = 200;

var continuing_flag;
var ga_timeout;

function gaIterate(population, survivors) {
	window.clearTimeout(ga_timeout);
	for (var i = 0; i < population.length; i++){
		if (!population[i].score)
			population[i].calculateScore();
	}

	
	population.sort(byScore);
	
	updateTable(population[0]);
	updateMap(population[0]);
	
	if (continuing_flag) {
		for (i = Math.ceil(survivors); i < GA_GENERATION_SIZE; i++) {
			var father = randomInt(Math.ceil(survivors));
			var mother;
			
			do {
				mother = randomInt(Math.ceil(survivors));
			}while (mother == father);
			
			population[i] = population[father].crossWith(population[mother]);
		}
		
		for (i = 0; i < GA_GENERATION_SIZE; i++) {
			if (Math.random() < GA_MUTATION_CHANCE)
				population[i].mutate();
		}
		
		if (survivors > GA_MIN_SURVIVORS)
			survivors += GA_SURVIVORS_DELTA;
		ga_timeout = window.setTimeout(function() { gaIterate(population, survivors); },GA_ITERATION_INTERVAL);
	}
	else {
		setBookmark(population[0].string);
	}
}

function byScore(a,b) {
	return a.score - b.score;
}