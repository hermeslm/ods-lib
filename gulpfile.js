'use strict';

var path = require('path'),
    gulp = require('gulp'),
    angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    naturalSort = require('gulp-natural-sort'),
    bowerFiles = require('main-bower-files'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemap = require('gulp-sourcemaps'),
    es = require('event-stream'),
    runSequence = require('run-sequence'),
    extend = require('extend'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('./build.conf.js'),
    plugins = require('gulp-load-plugins')();

var ciMode = false;

gulp.task('clean', function () {
    return gulp
        .src(config.buildFolder, {read: false})
        .pipe(plugins.clean());
});

gulp.task('scripts', function () {

    return gulp.src(config.srcJs)

    // jshint
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.if(ciMode, plugins.jshint.reporter('fail')))

        // package
        .pipe(plugins.concat(config.buildJsFilename))
        .pipe(plugins.header(config.closureStart))
        .pipe(plugins.footer(config.closureEnd))
        .pipe(plugins.header(config.banner))
        .pipe(gulp.dest(config.buildFolder))
        .pipe(plugins.filesize())

        // minify
        .pipe(plugins.uglify())
        .pipe(plugins.rename({extname: '.min.js'}))
        .pipe(gulp.dest(config.buildFolder))
        .pipe(plugins.filesize())
        .on('error', plugins.util.log);

});

gulp.task('templates', function () {
    return gulp.src(config.srcHtml)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({module: "ods-lib"}))
        .pipe(plugins.header(config.useStrict))
        .pipe(gulp.dest(config.destHtml));
});

gulp.task('forms-inject', function () {
    return gulp.src('./examples/forms/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/forms/**/*.css', './dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/forms/**/*.js', './dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/forms'));
});

gulp.task('forms-copy-css', function() {
    gulp.src(['./component/forms/**/*.css'])
        .pipe(gulp.dest('./dist/forms'));
});

//Task to process Sass files in the 'scss' folder
gulp.task('scss', function () {
    return gulp.src('./component/forms/style.scss')
        .pipe(sourcemap.init())
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers : ['> 1%', 'last 5 versions', 'ie > 10']
        })))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./dist/forms/'));
});

gulp.task('test', function () {

    karmaConfig({
        set: function (testConfig) {

            extend(testConfig, {
                singleRun: ciMode,
                autoWatch: !ciMode,
                browsers: ['PhantomJS']
            });

            karma.start(testConfig, function (exitCode) {
                plugins.util.log('Karma has exited with ' + exitCode);
                process.exit(exitCode);
            });
        }
    });
});

gulp.task('ci', function () {
    ciMode = true;
    return gulp.start(['clean', 'scripts', 'test']);
});

gulp.task('build', ['clean', 'templates', 'scripts']);



gulp.task('default', function (done) {
    runSequence('build', 'forms-copy-css', 'forms-inject', 'scss', function () {
        console.log('Run something else');
        done();
    });
});

//watcher task for the scss files
gulp.task('scss:watch', function () {
    gulp.watch('./component/forms/style.scss', ['scss']);
});

gulp.task('watch', function () {
    gulp.watch('./component/**/*', ['default']);
});