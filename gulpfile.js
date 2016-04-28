var deploy = require('gulp-gh-pages');
var gulp = require('gulp');
var liquid = require('gulp-liquid');
var replaceExtension = require('gulp-ext-replace');

var paths = {
  dist: './dist/',
  allDist: './dist/**/*',
  src: './src/',
  liquidSrc: './src/*.liquid'
}

var data = require(paths.src + 'data.json');

gulp.task('build', function () {
  return gulp.src(paths.liquidSrc)
    .pipe(liquid({
      locals: data
    }))
    .pipe(replaceExtension('.html'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('deploy', ['build'], function () {
  return gulp.src(paths.allDist)
    .pipe(deploy());
});
