const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite');

var config = {
  mode: {
    css: {
      render: {
        css: {
          template: './gulpfile.js/sprite-template.css'
        }
      }
    }
  }
};

function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
};
exports.createSprite = createSprite;

function copySpriteCSS() {
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(gulp.dest('./app/assets/styles/modules/'));
}
exports.copySpriteCSS = copySpriteCSS;