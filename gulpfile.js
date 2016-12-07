var gulp = require('gulp');
var debug = require('gulp-debug');
var del = require('del');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var distFolder = './dist/';

gulp.task('include-original-js', [], function() {
    return gulp.src('./src/**/*.js')
            .pipe(gulp.dest(distFolder));
});

gulp.task('build-js', ['include-original-js'], function() {
    return gulp.src('./src/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(debug({title: 'javascript:'}))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(sourcemaps.write('.', {
                mapFile: function(mapFilePath) {
                    return mapFilePath.replace('.js.map', '.map');
                }
            }))
            .pipe(gulp.dest(distFolder));
});

gulp.task('cleanup', function() {
	return del([
        'dist/**/*',
		'bower_components/**/*',
		'node_modules/**/*'
	]);
});

gulp.task('default', ['build-js']);
