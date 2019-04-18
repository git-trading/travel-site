const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');


function styles() {
  return gulp.src('./app/assets/styles/styles.css')
    // order of plugins in postcss is important
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer])) 
    .pipe(gulp.dest('./app/temp/styles/'))
}

exports.styles = styles;