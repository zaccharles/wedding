var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();

var stylesheetSource = 'app/stylesheets/**/*.scss';
var stylesheetOutput = 'public/css';
var htmlSource = 'app/**/*.html';
var htmlOutput = 'public';
var imageSource = 'app/images/**/*';
var imageOutput = 'public/images';
var jsSource = 'app/scripts/**/*';
var jsOutput = 'public/scripts';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var htmlminOptions = {
  collapseWhitespace: true
};

var imageminOptions = {
  progressive: true,
  svgoPlugins: [{removeViewBox: false}],
  use: [pngquant()]
};

gulp.task('stylesheets', function () {
  return gulp
    .src(stylesheetSource)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(stylesheetOutput))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src(htmlSource)
    .pipe(htmlmin(htmlminOptions))
    .pipe(gulp.dest(htmlOutput))
});

gulp.task('js', function () {
  return gulp.src(jsSource)
    .pipe(gulp.dest(jsOutput))
});

gulp.task('images', function () {
  return gulp.src(imageSource)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(imageOutput));
});

gulp.task('watch', function() {
  gulp.watch(stylesheetSource, ['stylesheets']);
  gulp.watch(htmlSource, ['html']).on('change', browserSync.reload);
  gulp.watch(imageSource, ['images']);
  gulp.watch(jsSource, ['js']).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
});

gulp.task('default', ['stylesheets', 'html', 'images', 'js', 'browser-sync', 'watch']);