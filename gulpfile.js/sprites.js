const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');
 
var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      // i don't understand this yet, this is used by sprite-template.css
      // to deal with .no-svg class for ancient browsers
      variables : {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png'); //replacing the extension
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulpfile.js/templates/sprite-template.css'
        }
      }
    }
  }
};

// deletes anything on app/temp/sprite and
// app/assets/images/sprites
// before actually creating new svg and css resources
function beginClean() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
};

// creating a consolidated svg file from the pile of svg
// files (for icons) in the app/assets/images/icons subdirectory
function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
};
// exports.createSprite = createSprite; // private task, no need to export this

function createPngCopy() {
  return gulp.src('./app/temp/sprite/css/*.svg')
  .pipe(svg2png())
  .pipe(gulp.dest('./app/temp/sprite/css'));
}

// copying the created sprite.css
// from createSprite task to app/assets/images/sprites
function copySpriteGraphic() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
  .pipe(gulp.dest('./app/assets/images/sprites/'));
};

// the copied sprite.css will be copied yet again to
// app/assets/styles/modules and named _sprite.css
function copySpriteCSS() {
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(rename('_sprite.css'))
  .pipe(gulp.dest('./app/assets/styles/modules/'));
};
// exports.copySpriteCSS = copySpriteCSS; // no need to export this

// the created directory app/temp/sprite and
// all children files and directories are deleted kasi nalipat na sa 
// assets/images/sprites and assets/styles/modules accordingly
// during the execution of copySpriteGraphic and copySpriteCSS tasks
function endClean() {
  return del(['./app/temp/sprite'])
};

exports.icons = gulp.series(
  beginClean,
  createSprite,
  createPngCopy,
  copySpriteGraphic,
  copySpriteCSS,
  endClean
);