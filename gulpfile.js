'use strict'

const fs = require('fs')

var gulp = require('gulp')
var sass = require('gulp-sass')
var jade = require('gulp-jade')
var rename = require('gulp-rename')
var slug = require('slug')
var marked = require('marked')

const DK_LANGS = ['en', 'cz']

var data_menu = require('./data/menu.json')
var data_cv = require('./data/cv.json')
var data_text = require('./data/text.json')
var data_image = require('./data/image.json')

const cssFromBower = [
	'bootstrap/dist/css/bootstrap.min.css'
]

const jsFromBower = [
	'jquery/dist/jquery.min.js'
]

const helpers = {
	slug: (str) => slug(str).toLowerCase()
}

/* HTML */
gulp.task('html', function() {

	// INDEX - Czech
	gulp.src('src/templates/index.jade')
	.pipe(jade({
		locals:  {
			lang: 'cz',
			cv: data_cv['cz'],
			menu: data_menu['cz'],
			images: data_image['cz'],
			texts: data_text['cz'],
			helpers
		}
	}))
	.pipe(gulp.dest('dist/cz'))

	// INDEX - English
	gulp.src('src/templates/index.jade')
	.pipe(jade({
		locals:  {
			lang: 'en',
			cv: data_cv['en'],
			menu: data_menu['en'],
			images: data_image['en'],
			texts: data_text['en'],
			helpers
		}
	}))
	.pipe(gulp.dest('dist/en'))

	// CV - Czech
	gulp.src('src/templates/cv.jade')
	.pipe(jade({
		locals:  {
			cv: data_cv['cz'],
			menu: data_menu['cz']
		}
	}))
	.pipe(gulp.dest('dist/cz'))

	// CV - English
	gulp.src('src/templates/cv.jade')
	.pipe(jade({
		locals:  {
			cv: data_cv['en'],
			menu: data_menu['en']
		}
	}))
	.pipe(gulp.dest('dist/en'))

	// IMAGES
	DK_LANGS.map(lang => {
		data_image[lang].map(image => {
			gulp.src('src/templates/image.jade')
			.pipe(jade({
				locals : {
					lang,
					menu: data_menu[lang],
					image,
					text: marked(fs.readFileSync('./data/texts/' + image.synopsis + '.md', 'utf-8')),
					helpers
				}
			}))
			.pipe(rename(helpers.slug(image.name) + '.html'))
			.pipe(gulp.dest('dist/' + lang))
		})
	})

	// TEXTS
	DK_LANGS.map(lang => {
		data_text[lang].map(text => {
			gulp.src('src/templates/text.jade')
			.pipe(jade({
				locals: {
					lang,
					menu: data_menu[lang],
					textMeta: text,
					text: marked(fs.readFileSync('./data/texts/' + text.text + '.md', 'utf-8')),
					helpers
				}
			}))
			.pipe(rename(helpers.slug(text.name) + '.html'))
			.pipe(gulp.dest('dist/' + lang))
		})
	})

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

/* Media files */
gulp.task('media', function () {

	gulp.src('media/**/*.*')
	.pipe(gulp.dest('dist/media'))

})

/* DEFAULT TASK */
gulp.task('watch', function () {

	gulp.watch('src/**/*.*', ['default'])

})

gulp.task('dev', ['default', 'watch'])
gulp.task('default', ['css', 'html', 'js', 'media'])