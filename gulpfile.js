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
    serve = require('./gulp-tasks/serve'),
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
            gulp.src(['./examples/forms/**/*.css', './examples/dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/forms/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/forms'));
});

// gulp.task('forms-copy-css', function () {
//     gulp.src(['./component/forms/**/*.css'])
//         .pipe(gulp.dest('./dist/forms'));
// });

//Task to process Sass files in the 'scss' folder
gulp.task('form-scss', function () {
    return gulp.src('./component/forms/style.scss')
        .pipe(sourcemap.init())
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers: ['> 1%', 'last 5 versions', 'ie > 10']
        })))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./dist/forms/'));
});

//Task to process Sass files in the 'scss' folder
gulp.task('steps-scss', function () {
    return gulp.src('./component/steps-indicator/style.scss')
        .pipe(sourcemap.init())
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers: ['> 1%', 'last 5 versions', 'ie > 10']
        })))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./dist/steps-indicator/'));
});

//CKEditor tasks
gulp.task('ckeditor-inject', function () {
    return gulp.src('./examples/ckeditor/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/ckeditor/**/*.css', './examples/dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/ckeditor/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/ckeditor'));
});

/**
 *  Remember this task will add those plugins to CKEditor but will replace
 *  default config file with the included in this folder.
 *
 */
gulp.task('build-ck-plugins', function () {
    gulp.src(['./plugins/ckeditor/**/*'])
        .pipe(gulp.dest('./examples/bower_components/ckeditor'));
});
//End CKEditor tasks

//J-Signature tasks
gulp.task('jsig-inject', function () {
    return gulp.src('./examples/jsignature/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/jsignature/**/*.css', './examples/dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/jsignature/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/jsignature'));
});
//End J-Signature tasks

//Address tasks
gulp.task('address-inject', function () {
    return gulp.src('./examples/address/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/address/**/*.css', './examples/dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/address/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/address'));
});

//Reports tasks
gulp.task('reports-inject', function () {
    return gulp.src('./examples/reports/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/reports/**/*.css', './examples/dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/reports/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/reports'));
});

//Task to process Sass files in the 'scss' folder
gulp.task('report-scss', function () {
    return gulp.src('./component/reports/style.scss')
        .pipe(sourcemap.init())
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers: ['> 1%', 'last 5 versions', 'ie > 10']
        })))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./dist/reports/'));
});

//Img upload tasks
gulp.task('img-upload-inject', function () {
    return gulp.src('./examples/img-upload/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/img-upload/**/*.css', './examples/dist/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/img-upload/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/img-upload'));
});

//Wizard Steps tasks
gulp.task('wizard-steps-inject', function () {
    return gulp.src('./examples/wizard-steps/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(
            gulp.src(['./examples/wizard-steps/**/*.css', './examples/dist/wizard-steps/**/*.css', '!./bower_components/**'], {read: false}),
            gulp.src(['./examples/wizard-steps/**/*.js', './examples/dist/ods-lib.js', '!./bower_components/**'])
                .pipe(naturalSort())
                .pipe(angularFilesort())
        ), {relative: true}))
        .pipe(gulp.dest('./examples/wizard-steps'));
});

//Task to process Sass files in the 'scss' folder
gulp.task('wizard-steps-scss', function () {
    return gulp.src('./component/wizard-steps/style.scss')
        .pipe(sourcemap.init())
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers: ['> 1%', 'last 5 versions', 'ie > 10']
        })))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./dist/wizard-steps/'));
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

// gulp.task('build', ['clean', 'templates', 'scripts']);
gulp.task('build', function (done) {
    runSequence('clean', 'templates', 'scripts', 'form-scss', 'steps-scss', 'report-scss', 'wizard-steps-scss',
        'forms-inject', 'ckeditor-inject', 'jsig-inject', 'address-inject', 'reports-inject', 'img-upload-inject',
        'wizard-steps-inject', 'copy-lib-to-samples', function () {
            // console.log('Run something else');
            done();
        })
});

gulp.task('default', function (done) {
    runSequence('build', function () {
        // console.log('Run something else');
        done();
    });
});

gulp.task('copy-lib-to-samples', function () {
    gulp.src(['./dist/**/*'])
        .pipe(gulp.dest('./examples/dist'));
});

gulp.task('watch', function () {
    gulp.watch('./component/**/*', ['default']);
});

gulp.task('serve', function (done) {
    runSequence('build', 'forms-inject', 'copy-lib-to-samples', function () {
        console.log('Running serve task.');
        serve();
        done();
    });
});