const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const SASS_PATH = 'css/scss/**/*.scss'

gulp.task('sass', compilaSass);
gulp.task('watch', watch);
gulp.task('browser-sync', browser)
gulp.task('default', gulp.parallel(['watch', 'browser-sync']));

function compilaSass() {
  return gulp
    .src(SASS_PATH)
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}


function watch() {
  gulp.watch(SASS_PATH, compilaSass);
  gulp.watch(['*.html']).on('change', browserSync.reload)
}

function browser() {
  browserSync.init({
    port: 3002,
    server: {
      baseDir: './',
    }
  })
}
