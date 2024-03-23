const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const SASS_PATH = "css/scss/**/*.scss";
const JS_PATH = "js/main/*.js";

gulp.task("sass", compilaSass);
gulp.task("js", compileJs);
gulp.task("watch", watch);
gulp.task("browser-sync", browser);
gulp.task("default", gulp.parallel(["watch", "browser-sync", "sass", "js"]));

function compilaSass() {
  return gulp
    .src(SASS_PATH)
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

function compileJs() {
  return gulp
    .src(JS_PATH)
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch(SASS_PATH, compilaSass);
  gulp.watch(JS_PATH, compileJs);
  gulp.watch(["*.html"]).on("change", browserSync.reload);
}

function browser() {
  browserSync.init({
    port: 3002,
    server: {
      baseDir: "./",
    },
  });
}
