var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var childProcess = require('child_process')
gulp.task('publish',['build'],function(){
    childProcess.exec('npm publish');
});

gulp.task('build',function(){
    gulp.src('./src/index.js')
    .pipe(rename('js-console.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('js-console.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test',function(){

});