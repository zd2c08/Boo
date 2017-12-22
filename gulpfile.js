'use strict';

var gulp        = require('gulp');
var del         = require("del");
var plumber     = require("gulp-plumber");
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task("delHtml", function() {
  del(["html/*.html"]);
});
gulp.task("delSass", function() {
  del(["html/css/*.css"]);
});

gulp.task('copy', function() {
  return gulp.src([
    'assets/**/*.html'
  ])
  .pipe(plumber())
  .pipe(gulp.dest('html/'))
  .pipe(browserSync.stream());
});

gulp.task('sass',function() {
  return gulp.src([
    'assets/stylesheets/**/*.scss'
  ])
  .pipe(plumber())
  .pipe(sass({outputStyle:'compressed'}))
  .pipe(gulp.dest('html/css/'))
  .pipe(browserSync.stream());
})

gulp.task('default', ['delHtml','delSass','copy','sass'], function() {
  browserSync.init({
    server: {
      baseDir: "html"
    }
  });

  gulp.watch(['assets/**/*.html'], ['delHtml', 'copy']);
  gulp.watch(['assets/stylesheets/*.scss'], ['delSass', 'sass']);
});

