const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');


requireDir('./gulp/tasks');

gulp.task('build', () => {
  runSequence(
    'clean',
    ['copy-files', 'js', 'node-modules', 'pug', 'sass']
  );
});
gulp.task('watch', ['copy-files:watch', 'js:watch', 'node-modules:watch', 'pug:watch', 'sass:watch']);
