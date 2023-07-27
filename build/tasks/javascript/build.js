const gulp = require('gulp');

module.exports = function () {
  return gulp.src("../assets/js/**/*.js").pipe(gulp.dest("../public/js"));
};
