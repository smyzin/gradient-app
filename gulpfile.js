'use strict';

const lr = require('tiny-lr'), // Минивебсервер для livereload
	gulp = require('gulp'), // Gulp JS
	stylus = require('gulp-stylus'), // Плагин для Stylus
	livereload = require('gulp-livereload'), // Livereload для Gulp
	myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
	concat = require('gulp-concat'), // Склейка файлов
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	react = require('react');

gulp.task('js', function() {
	return gulp.src('assets/js/*.js')
	.pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
	.pipe(gulp.dest('src/js'))
	.pipe(reload({stream: true})); // даем команду на перезагрузку страницы
});

gulp.task('stylus', function(){
	return gulp.src('assets/stylus/main.styl')
	.pipe(stylus())
	.on('error', console.log) // Если есть ошибки, выводим и продолжаем
	.pipe(myth()) // добавляем префиксы - http://www.myth.io/
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream: true})); // даем команду на перезагрузку css
});

gulp.task('connect', function() {

    browserSync.init({
        server: "."
    });
    // gulp.series('build-min-global');

	gulp.watch('assets/stylus/**/*.styl', gulp.series('stylus'));
	gulp.watch('assets/js/*.js', gulp.series('js'));
	gulp.watch('*.html').on('change', reload);

});


gulp.task('server', gulp.series('connect'));
