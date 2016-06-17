const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');

const config = require('./../gulp.config').node;
const blob = `./package.json`;

gulp.task('node-modules', () => {
  const libs = config.libs;
  const bundle = browserify({ debug: true, require: libs });

  return bundle.bundle()
      .pipe(source(config.output))
      .pipe(gulp.dest(config.dest));
});

gulp.task('node-modules:watch', () => {
  gulp.watch(blob, ['node-modules']);
});
