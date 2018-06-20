const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const pug = require('gulp-pug');
const sass = require('gulp-sass');

const path = {};
path.src = "src/";
path.dest = "dist/";
path.modules = "node_modules/";

// Templates
gulp.task('templates', () => {
  return gulp.src(path.src + 'pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(path.dest));
});
gulp.task('templates-watch', ['templates'], reload);

// Styles
gulp.task('sass', () => {
  return gulp.src(path.src + 'sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.dest + 'css'))
    .pipe(reload({stream: true}));
});

// JS
gulp.task('webpack', () => {
  return gulp.src(path.src + 'js/main.js')
    .pipe(webpack(webpackConfig, null, () => {reload()}))
    .pipe(gulp.dest(path.dest + 'js'));
});

// Serve
gulp.task('sync', ['templates', 'sass'], function() {
  browserSync({
    server: './dist',
    open: false
  });
  gulp.watch(path.src + '**/*.sass', ['sass']);
  gulp.watch(path.src + 'pug/**/*.pug', ['templates-watch']);
});

gulp.task('default', ['sync', 'webpack']);
