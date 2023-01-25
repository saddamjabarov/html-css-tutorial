const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass')(require('sass'));

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: 'sass',
    },
  });

  gulp.task('styles', function () {
    return gulp
      .src('./../sass/*.+(scss|sass)')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
  });
});
gulp.task('watch', function () {
  gulp.watch('./../sass/*.+(scss|sass)', gulp.parallel('styles'));
  gulp.watch('./../html/*.html').on('change', browserSync.reload);
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
