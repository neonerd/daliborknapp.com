'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var jade = require('gulp-jade')

const cssFromBower = [
	'bootstrap/dist/css/bootstrap.min.css'
]

const jsFromBower = [
	'jquery/dist/jquery.min.js'
]

/* HTML */
gulp.task('html', function() {

	gulp.src('src/templates/**.jade')
	.pipe(jade())
	.pipe(gulp.dest('dist'))

})

/* CSS */
gulp.task('css', function() {

	for(let cssFile of cssFromBower) {
		gulp.src('bower_components/' + cssFile)
		.pipe(gulp.dest('dist/css'))
	}

	gulp.src('src/scss/**/*.*')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))

})

/* JavaScript */
gulp.task('js', function () {

	for(let jsFile of jsFromBower) {
		gulp.src('bower_components/' + jsFile)
		.pipe(gulp.dest('dist/js'))
	}

	gulp.src('src/js/**/*.*')
	.pipe(gulp.dest('dist/js'))

})

/* DEFAULT TASK */
gulp.task('watch', function () {

	gulp.watch('src/**/*.*', ['default'])

})

gulp.task('dev', ['default', 'watch'])
gulp.task('default', ['css', 'html', 'js'])