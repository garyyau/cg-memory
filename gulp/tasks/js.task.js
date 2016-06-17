const _ = require('lodash');
const browserify = require('browserify');
const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

const config = require('./../gulp.config').js;

const build = (bundle) => {
  return bundle.bundle()
    .on('error', (error) => {
      gutil.log("[Error] Browserify Parsing Error");
      gutil.log(error.toString());
    })
    .pipe(source(config.output))
    .pipe(gulp.dest(config.dest));
};

const bundleConfig = _.assign({}, watchify.args, {
  entries: [config.src],
  transform: [['babelify', {
    presets: ['es2015', 'stage-1'],
  }]],
  debug: true,
  bundleExternal: false,
});

gulp.task('js', () => {
  const bundle = browserify(bundleConfig);
  return build(bundle);
});

gulp.task('js:watch', () => {
  const bundle = browserify(bundleConfig);
  const watcher = watchify(bundle);
  watcher.on('update', () => build(watcher));
  watcher.on('log', gutil.log);
  return build(watcher);
});
