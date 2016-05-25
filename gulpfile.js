const concat = require("gulp-concat");
const gulp = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");  // TODO delete
const rimraf = require("gulp-rimraf");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");
const webpack = require("gulp-webpack");

let DEV_MODE = false;
const SRC_PATH = "./src";
const DEST_PATH = "./public";
const ASSETS_PATH = `${DEST_PATH}/assets`;

gulp.task("default", [ "build" ]);

gulp.task("clean", () => {
    return gulp.src(DEST_PATH)
               .pipe(rimraf());
});

gulp.task("build", [ "clean" ], (cb) => {
    runSequence(
        "build-vendor",
        "build-less",
        "build-js",
        "build-html",
        cb
    );
});

gulp.task("build-vendor", () => {
    // TODO
    return gulp.src([
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/jquery.transit/jquery.transit.js",
        `${SRC_PATH}/lib/d3.min.js`
    ]).pipe(uglify())
      .pipe(concat("ventor.js"))
      .pipe(gulp.dest(ASSETS_PATH));
});

gulp.task("build-less", () => {
    const chain = gulp.src(`${SRC_PATH}/res/index.less`)
                      .pipe(less());

    if (DEV_MODE) {
        return chain.pipe(gulp.dest(`${ASSETS_PATH}/res`));
    }
    else {
        // TODO
        return;
    }
});

gulp.task("build-js", () => {
    const chain = gulp.src(`${SRC_PATH}/app/index.js`)
                      .pipe(webpack({
                          module: {
                              loaders: [
                                  { test: /\.js$/, loader: "babel" }
                              ]
                          }
                      }));

    if (DEV_MODE) {
        return chain.pipe(rename("index.js"))
                    .pipe(gulp.dest(`${ASSETS_PATH}/app`));
    }
    else {
        // TODO
        return;
    }
});

gulp.task("build-html", () => {
    // TODO
    return gulp.src(`${SRC_PATH}/index.html`)
               .pipe(gulp.dest(DEST_PATH));
});




/************************/
/* DEVELOPMENT MODE     */
/************************/
// TODO
gulp.task("dev", (cb) => {
    DEV_MODE = true;
    runSequence(
        "build",
        cb
    );
});
