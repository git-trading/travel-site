const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename');
 
var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulpfile.js/templates/sprite-template.css'
        }
      }
    }
  }
};

// creating a consolidated svg file from the pile of svg
// files (for icons) in the app/assets/images/icons subdirectory
function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
};
// exports.createSprite = createSprite;

// copying the created sprite.css
// from createSprite task to app/assets/images/sprites
function copySpriteGraphic() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
  .pipe(gulp.dest('./app/assets/images/sprites/'));
}

// the copied sprite.css will be copied yet again to
// app/assets/styles/modules and named _sprite.css
function copySpriteCSS() {
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(rename('_sprite.css'))
  .pipe(gulp.dest('./app/assets/styles/modules/'));
}
// exports.copySpriteCSS = copySpriteCSS;

exports.icons = gulp.series(createSprite, copySpriteGraphic, copySpriteCSS);