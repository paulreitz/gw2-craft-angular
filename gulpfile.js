var gulp = require("gulp");
var less = require("gulp-less");

gulp.task("less", function(){
    gulp.src("./src/less/theme.less")
    .pipe(less())
    .pipe(gulp.dest('./src/'));
});

gulp.task("less-watch", function(){
    gulp.watch(["./src/less/**/*.less"], ["less"]);
});