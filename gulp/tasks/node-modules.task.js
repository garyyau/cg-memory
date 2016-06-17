const _ = require('lodash');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const fs = require('fs');

const config = require('./../gulp.config').node;
const blob = `./package.json`;

gulp.task('node-modules', () => {
  const pkg = JSON.parse(fs.readFileSync(blob, 'utf-8'));
  const libs = _.keys(pkg.dependencies);
  const bundle = browserify({ debug: true, require: libs });

  bundle.bundle()
      .pipe(source(config.output))
      .pipe(gulp.dest(config.dest))
});

gulp.task('node-modules:watch', () => {
  gulp.watch(blob, ['node-modules']);
});
