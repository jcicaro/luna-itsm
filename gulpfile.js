var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var clientDir = 'client-src';
var publicDir = 'client-public';

gulp.task('style', function () {
    return gulp.src([clientDir + '/sass/main.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./' + publicDir + '/css'));
});

gulp.task('js', function () {
    return gulp.src([
			clientDir + '/js/*.js',
		])
        .pipe(concat('main.js'))
		.pipe(babel()) // es6 support
        // .pipe(uglify())
        .pipe(gulp.dest('./' + publicDir + '/js'));
});

// Gulp task to copy partial HTML files to public
// gulp.task('html', function () {
//     return gulp.src(clientDir + '/js/templates/*.html')
//         .pipe(gulp.dest('./' + publicDir + '/js/templates'));
// });

gulp.task('default', function () {
    gulp.watch(clientDir + '/sass/**/*.scss', gulp.series('style'));
    gulp.watch(clientDir + '/js/**/*.js', gulp.series('js'));
    // gulp.watch(clientDir + 'js/templates/**/*.html', gulp.series('html'));
});