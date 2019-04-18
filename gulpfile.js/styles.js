const gulp = require('gulp'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');


function styles() {
  return gulp.src('./app/assets/styles/styles.css')
    // order of plugins in postcss is important
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer])) 
    .pipe(gulp.dest('./app/temp/styles/'))
}

exports.styles = styles;