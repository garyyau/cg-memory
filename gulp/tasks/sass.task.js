const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const sass = require('gulp-sass');

const config = require('./../gulp.config').scss;
const blob = `${config.src}**/*.scss`;

gulp.task('sass', () => {
  return gulp.src(blob)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(concat(config.output))
    .pipe(gulp.dest(config.dest));
});

gulp.task('sass:watch', () => {
  return gulp.watch(blob, ['sass']);
});
