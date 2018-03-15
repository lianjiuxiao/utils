const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserify = require('gulp-browserify');
const order = require('gulp-order');

gulp.task('js:utils', () => {
    return gulp.src(['./components/index.js'])
    // utils相关文件会用import, export互相引用，需要用browserify的transform: ['babelify']，故无需再用gulp-babel
    // .pipe(babel())
        .pipe(browserify({transform: ['babelify']}))
        .on('error', console.log)
        .pipe(concat('utils.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());

});
gulp.task('dev', [], () => {
    console.log(`[${new Date()}]: ready to develop!`);
    browserSync.init({
        server: {
            baseDir: './',
            directory: true
        },
        port: '2000',
        startPath: `./index.html`
    });
    gulp.watch(['./utils/*.js'], ['js:utils']);
});