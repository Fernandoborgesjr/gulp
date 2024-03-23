const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const SASS_PATH = "css/scss/**/*.scss";
const JS_PATH = "js/main/*.js";

exports.sass = compilaSass;
exports.js = compileJs;
exports.plugins = pluginsJs;
exports.watch = watch;
exports.browserSync = browser;
exports.default = gulp.parallel([
  watch,
  browser,
  compilaSass,
  compileJs,
  pluginsJs,
]);

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

function pluginsJs() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/moment/min/moment.min.js",
    ])
    .pipe(concat("plugins.js"))
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
