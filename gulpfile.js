const gulp = require('gulp');
const shell = require('gulp-shell');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const webpackConfig = require('./gulp/webpack.config');
const WebpackDevServer = require("webpack-dev-server");
const gutil = require("gulp-util");

gulp.task('clean', function () {
    return gulp.src(['www', 'www-dev'], { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('dev-build-js', () =>
    gulp.src('src/js/index.js')
        .pipe(named())
        .pipe(webpackStream(webpackConfig.devConfig))
        .pipe(gulp.dest('www/js'))
);

gulp.task('build-js', () =>
    gulp.src('src/js/index.js')
        .pipe(named())
        .pipe(webpackStream(webpackConfig.prodConfig))
        .pipe(gulp.dest('www/js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/js'))
);

gulp.task('html', () =>
    gulp.src('src/index.html')
        .pipe(gulp.dest('www'))
);

gulp.task('assets', () =>
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('www/assets'))
);

gulp.task('cordova-build-browser', shell.task('npx cordova build browser'));

gulp.task('cordova-run-android', shell.task('npx cordova run android'));

gulp.task('cordova-debug-build-android', shell.task('npx cordova build android'));

gulp.task('dev-build', gulp.series('dev-build-js', 'html', 'assets'));

gulp.task('build', gulp.series('build-js', 'html', 'assets'));

gulp.task('watch', () => {
    return gulp.watch([
        'src/**/*.*',
    ],
        gulp.series('dev-build', 'cordova-build-browser')
    );
});

gulp.task('dev', gulp.series('clean', 'dev-build', 'cordova-build-browser', 'watch'));

gulp.task('run-android', gulp.series('clean', 'build', 'cordova-run-android', 'clean', 'dev-build'));

gulp.task('run-android-dev', gulp.series('dev-build', 'cordova-run-android'));

gulp.task('dev-build-android', gulp.series('clean', 'build', 'cordova-debug-build-android', 'clean', 'dev-build'));

gulp.task('default', gulp.series('dev'));

gulp.task('depsgraph', shell.task('madge ./src/js/index.js -i ./tools/index.png'));

gulp.task("webpack-dev-server", function (callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig.webpackDevServerConfig);
    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // callback();
    });
});
