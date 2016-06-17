const gulp = require('gulp');
const pug = require('gulp-pug');
const util = require('gulp-util');

const config = require('./../gulp.config').pug;
const blob = `${config.src}**/*.pug`;

gulp.task('pug', () => {
   gulp.src(blob, {base: config.src})
    .on('error', (error) => {
      util.log(`[Error] Pug compilation error.`);
      util.log(error.toString());
    })
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(config.dest));
});

gulp.task('pug:watch', () => {
  return gulp.watch(blob, ['pug']);
});
