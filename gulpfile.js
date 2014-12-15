/* global require */

var Interfake = require('interfake');
var gulp = require('gulp');
var moment = require('moment');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var browserifyHandlebars = require('browserify-handlebars');

/*
 * I've set a 'browserify' gulp task to improve modularity of code and dependency management.
 * I've seen that moment.js is used on server side, so it's easy to bundle it with browserify for client-side use too
 * I've added the precompilation for Handlebars templates and the file minification on this gulp task too
 */
gulp.task('browserify', function() {
	gulp.src('./js/index.js')
	.pipe(browserify({
		transform: [browserifyHandlebars]
	}))
	.pipe(uglify())
	.pipe(gulp.dest('./build/'));
});

gulp.task('serve', function(done) {
	var interfake = new Interfake({ path : '/api', debug: true });
	interfake.get('/bookings').body([{
		id: 1,
		title: 'Private Tennis Lesson with Andy Murray',
		date: moment().add(1, 'days'),
		instructor: {
			id: 2,
			name: 'Andy Murray'
		},
		attendee: {
			id: 3,
			name: 'Jonathan Ross'
		},
		location: {
			lat: 51.531270,
			lng: -0.156969
		},
		number_of_comments: 3
	}, {
		id: 2,
		title: 'Group Boules Lesson with Gregor McGee',
		date: moment().add(2, 'days'),
		instructor: {
			id: 4,
			name: 'Gregor McGee'
		},
		attendee: {
			id: 3,
			name: 'Jonathan Ross'
		},
		location: {
			lat: 51.534884,
			lng: -0.039654
		},
		number_of_comments: 1
	}]);

	interfake.get('/bookings/1').body(
		[{
			body: 'Are you ready for the upcoming lesson?',
			author: {
				id: 2,
				name: 'Andy Murray',
				type: 'instructor'
			},
			date: moment().subtract(1, 'days')
		}, {
			body: 'I am!',
			author: {
				id: 3,
				name: 'Jonathan Ross',
				type: 'attendee'
			},
			date: moment().subtract(20, 'hours')
		}, {
			body: 'Great, see you soon!',
			author: {
				id: 2,
				name: 'Andy Murray',
				type: 'instructor'
			},
			date: moment().subtract(15, 'hours')
		}]
	);

	interfake.get('/bookings/2').body(
		[{
			body: 'Are you ready for the tutorial, young man?',
			author: {
				id: 4,
				name: 'Gregor McGee',
				type: 'instructor'
			},
			date: moment().subtract(4, 'hours')
		}]
	);

	var postCommentsBooking1 = interfake.post('/bookings/1/comments');

	postCommentsBooking1.extends.get('/bookings').body({
		0: {
			number_of_comments: 4
		}
	});

	postCommentsBooking1.extends.get('/bookings/1').body({
		number_of_comments: 4,
		comments : [{
			body: 'Yep, see you there!',
			author: {
				id: 3,
				name: 'Jonathan Ross',
				type: 'attendee'
			},
			date: moment()
		}]
	});

	var postCommentsBooking2 = interfake.post('/bookings/2/comments');

	postCommentsBooking2.extends.get('/bookings').body({
		0: {
			number_of_comments: 2
		}
	});

	postCommentsBooking2.extends.get('/bookings/1').body({
		number_of_comments: 2,
		comments : [{
			body: 'I sure am!',
			author: {
				id: 3,
				name: 'Jonathan Ross',
				type: 'attendee'
			},
			date: moment()
		}]
	});

	interfake.serveStatic('/', './');

	interfake.listen(3000, function() {
		done();
	});
});

gulp.task('default', ['browserify', 'serve'], function() {

});