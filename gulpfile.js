var gulp = require('gulp');
var del = require('del');
var clip = require('gulp-clip-empty-files');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
    js: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'vendor/js/angular-timer.js',
        'client/app.js',
        'client/**/*.js'],
    css: ['client/style.css',
        'client/vendor/css/bootstrap.slate.css'],
    html: ['client/index.html',
        'client/**/*.html']
};

//clean up old build
gulp.task('clean', function clean(callback) {
    del(['build'], callback);
});

//copy over html
gulp.task('html', function() {
    gulp.src(paths.html, { base: 'client' })
        .pipe(clip())
        .pipe(gulp.dest('build'));
});

//minify and concat all js
gulp.task('minify-js', function() {
    gulp.src(paths.js)
        .pipe(clip())
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('.', {addComment: false}))
        .pipe(gulp.dest('build'));
});

//minify and concat all css
gulp.task('minify-css', function() {
    gulp.src(paths.css)
        .pipe(clip())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('build'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js, ['minify-js']);
    gulp.watch(paths.css, ['minify-css']);
});

gulp.task('server', function() {
    //start server
    require('./server/server.js');
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['server', 'html', 'minify-js', 'minify-css']);
gulp.task('debug', ['server', 'watch', 'html', 'minify-js', 'minify-css']);
gulp.task('build', ['html', 'minify-js', 'minify-css']);