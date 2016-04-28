var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

var paths = {
  allDist: './dist/**/*'
}

gulp.task('build', function () {

});
gulp.task('deploy', ['build'], function () {
  return gulp.src(paths.allDist)
    .pipe(deploy());
});
