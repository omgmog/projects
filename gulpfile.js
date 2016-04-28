var deploy = require('gulp-gh-pages');
var gulp = require('gulp');
var liquid = require('gulp-liquid');
var replaceExtension = require('gulp-ext-replace');
var sass = require('gulp-sass');

var paths = {
  dist: './dist/',
  allDist: './dist/**/*',
  src: './src/',
  allSrc: './src/**/*',
  liquidSrc: './src/*.liquid',
  sassSrc: './src/*.scss'
}

var data = require(paths.src + 'data.json');

gulp.task('build:html', function () {
  return gulp.src(paths.liquidSrc)
    .pipe(liquid({
      locals: data
    }))
    .pipe(replaceExtension('.html'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:other', function () {
  return gulp.src(paths.src + 'CNAME')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:styles', function () {
  return gulp.src(paths.sassSrc)
    .pipe(sass())
    .pipe(replaceExtension('.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['build:html', 'build:other', 'build:styles']);

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.allSrc, ['build']);
});

gulp.task('deploy', ['build'], function () {
  return gulp.src(paths.allDist)
    .pipe(deploy());
});
