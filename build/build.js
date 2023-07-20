const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const message = require('./lib/message');

const browserSync = require('browser-sync').create();

/* HTML Tasks */
gulp.task('html:build', require('./tasks/html/build'));
gulp.task('html:clean', require('./tasks/html/clean'));

/* Markdown Tasks */
gulp.task("markdown:build", require("./tasks/markdown/build"));

/* SASS Tasks */
gulp.task('sass:build', require('./tasks/sass/build'));
gulp.task('sass:clean', require('./tasks/sass/clean'));
gulp.task('sass:lint', require('./tasks/sass/lint'));

/* JavaScript Tasks */
gulp.task('javascript:build', require('./tasks/javascript/build'));
gulp.task('javascript:clean', require('./tasks/javascript/clean'));
gulp.task('javascript:lint', require('./tasks/javascript/lint'));

/* Font Tasks */
gulp.task('font:build', require('./tasks/font/build'));
gulp.task('font:clean', require('./tasks/font/clean'));

/* Image Tasks */
gulp.task('image:build', require('./tasks/image/build'));
gulp.task('image:clean', require('./tasks/image/clean'));

/* Static Asset Tasks */
gulp.task('static:copy', function () {
  return gulp.src('../static/**/*')
    .pipe(gulp.dest('../public/'));
});

/* Domain Tasks */
gulp.task('html', gulp.series('html:clean', 'html:build'));
gulp.task("markdown", gulp.series("markdown:build"));
gulp.task('sass', gulp.series('sass:clean', 'sass:lint', 'sass:build'));
gulp.task('javascript', gulp.series('javascript:clean', 'javascript:lint', 'javascript:build'));
gulp.task('font', gulp.series('font:clean', 'font:build'));
gulp.task('image', gulp.series('image:clean', 'image:build'));
gulp.task('static', gulp.series('static:copy'));

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('watch', function () {
  browserSync.init({
    open: false,
    server: {
      baseDir: '../public',
      index: 'index.html'
    },
    port: 3000,
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", function (req, res, next) {
            if (req.domain === null) {
              res.statusCode = 404;
              res.setHeader('Content-type', 'text/html');
              let pagePath = path.join(__dirname, '..', 'public', '404.html'); 
              let html = fs.readFileSync(pagePath);
              res.write(html);    
              res.end();

              return res;
            }

            return next;
        });
      }
    }
  });

  gulp.watch('../src/**/*.html', gulp.series('html', reload))
    .on('error', message.error('WATCH: Views'));

  gulp.watch("../src/**/*.md", gulp.series("markdown", reload))
    .on("error", message.error("WATCH: Markdown"));

  gulp.watch('../assets/sass/**/*.scss', gulp.series('sass', reload))
    .on('error', message.error('WATCH: Sass'));

  gulp.watch('../assets/js/**/*.js', gulp.series('javascript', reload))
    .on('error', message.error('WATCH: JavaScript'));

  gulp.watch('../assets/font/**/*', gulp.series('font', reload))
    .on('error', message.error('WATCH: Font'));

  gulp.watch('../assets/img/**/*.{jpg,jpeg,png,gif,svg}', gulp.series('image', reload))
    .on('error', message.error('WATCH: Image'));

  gulp.watch('../static/**/*', gulp.series('static', reload))
    .on('error', message.error('WATCH: Static Assets'));
});

gulp.task('default', gulp.parallel('html', "markdown", 'sass', 'javascript', 'font', 'image', 'static'));
