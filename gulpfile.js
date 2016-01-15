const gulp = require('gulp');
const GulpSSH  = require('gulp-ssh');
const fs  = require('fs');

var config = {
  host: 'ex.ua',
  username: 'fexpub',
  privateKey: fs.readFileSync('./secret/id_rsa')
};

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

// --

gulp.task('dest', function () {
  return gulp.src('./dist/**/*')
    .pipe(gulpSSH.dest('/home/fex/htdocs/scolding'));
});
// --

gulp.task('default', [
  'dest', 
  'watch'
  ]);

gulp.task('watch', function() {
    gulp.watch(['dist/*.html', 'dist/js/*.js', 'dist/css/*.css'], [ 
      'dest'
    ]);
});

// --