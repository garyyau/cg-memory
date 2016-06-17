const gulp = require('gulp');
const del = require('del');

const config = require('./../gulp.config');

gulp.task('clean', (cb) => {
  return del([`${config.dest}**`], cb);
});
