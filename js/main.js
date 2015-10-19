var projects = [
	{
		'name': 'Indianapolis Brewery Map',
		'url': 'http://danodea.github.io/indy-brewery-map/',
		'description': 'A single page map app using multiple APIs to visualize information about all the breweries in Indianapolis!  Built with Knockout and Google Maps.',
		'live': true
	},
	{
		'name': 'Feed Reader Test Suite',
		'url': 'http://danodea.github.io/feed-reader-test-suite/',
		'description': 'Testing a provided RSS reader app using the Jasmine testing framework.',
		'live': true
	},
	{
		'name': 'Frogger Clone',
		'url': 'http://danodea.github.io/arcade-game-clone/',
		'description': 'A simple clone of the classic arcade game Frogger made with HTML5 Canvas and jQuery.',
		'live': true
	},
	{
		'name': 'Better Soccer Rosters',
		'url': 'https://github.com/danodea/better-soccer-rosters',
		'description': 'An effort to create a better MLS roster app.  Built with Node.js.',
		'live': false
	},
	{
		'name': 'UGUI',
		'url': 'https://github.com/UniversalGUI/UGUI',
		'description': 'UGUI gives a face to command line programs, and that face is HTML, CSS, & JS.',
		'live': false
	},
	{
		'name': 'Calorie Counter',
		'url': 'http://danodea.github.io/calorie-counter/',
		'description': 'Count your calories by using this simple app.  Built with Backbone, and gets data from the nutritionix API.',
		'live': true
	}
];

var liveProjects = document.getElementById('liveProjects');
var repos = document.getElementById('repos');

var source = document.getElementById('project-template').innerHTML;
var template = Handlebars.compile(source);

for (var i = 0; i < projects.length; i++) {
	if (projects[i].live === true) {
		liveProjects.innerHTML += template(projects[i]);
	} else {
		repos.innerHTML += template(projects[i]);
	}
};