
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const rollup = require('gulp-rollup')

const handleErrors = function (err) {
  console.log(err)
  this.emit('end')
}

function cliRollup () {
  return gulp.src(['./src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(rollup({
    entry: './src/cli/index.js',
    sourceMap: true
  }))
  .on('error', handleErrors)
  .pipe(gulp.dest('./_build/'))
}

function libRollup () {
  return gulp.src(['./src/lib/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(rollup({
    entry: './src/lib/index.js',
    sourceMap: true
  }))
  .on('error', handleErrors)
  .pipe(gulp.dest('./_build/lib/'))
}

function libTestRollup () {
  return gulp.src(['./src/test/lib/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(rollup({
    entry: './src/test/lib/index.js',
    sourceMap: true
  }))
  .on('error', handleErrors)
  .pipe(gulp.dest('./_build/test/lib/'))
}

function cliTestRollup () {
  return gulp.src(['./src/test/cli/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(rollup({
    entry: './src/test/cli/index.js',
    sourceMap: true
  }))
  .on('error', handleErrors)
  .pipe(gulp.dest('./_build/test/cli/'))
}

const allTasks = [cliRollup, libRollup, cliTestRollup, libTestRollup]

gulp.task('default', gulp.parallel(allTasks))
gulp.task('watch', gulp.series(gulp.parallel(allTasks), () => {
  gulp.watch('./src/lib/**/*.js', gulp.parallel([libRollup]))
  gulp.watch('./src/cli/**/*.js', gulp.parallel([cliRollup]))
  gulp.watch('./src/test/lib/**/*.js', gulp.parallel([libTestRollup]))
  gulp.watch('./src/test/cli/**/*.js', gulp.parallel([cliTestRollup]))
}))
