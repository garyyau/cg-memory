const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const gulp = require('gulp');
const minify = require('gulp-minify-css');
const sass = require('gulp-sass');

const config = require('./../gulp.config').scss;
const blob = `${config.src}**/*.scss`;

gulp.task('sass', () => {
  return gulp.src(blob)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat(config.output))
    .pipe(minify())
    .pipe(gulp.dest(config.dest));
});

gulp.task('sass:watch', () => {
  return gulp.watch(blob, ['sass']);
});
