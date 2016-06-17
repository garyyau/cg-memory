const gulp = require('gulp');

const config = require('./../gulp.config');
const blob = [`${config.src}**/*.{png,gif,jpg}`];

gulp.task('copy-files', () => {
  return gulp.src(blob)
    .pipe(gulp.dest(`${config.dest}`));
});

gulp.task('copy-files:watch', () => {
  return gulp.watch(blob, ['copy-files']);
});
