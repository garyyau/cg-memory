const gulp = require('gulp');
const browserSync = require('browser-sync');

const config = require('./../gulp.config');

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    proxy: 'http://localhost:1337',
    files: [`${config.dest}/**/*.{html,css,js}`],
    browser: 'google chrome',
    port: 7002,
  });
});
