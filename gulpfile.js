const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
browserSync = require('browser-sync').create(),
svgSprite = require('gulp-svg-sprite');

function styles() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer])) // order of plugins is important
    .pipe(gulp.dest('./app/temp/styles/'))
}

exports.styles = styles;

function html(cb) {
  console.log('reloading...');
  browserSync.reload();
  cb();
};

function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
};

function watch() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './app' // points to where index.html lives
    }
  });
  gulp.watch('./app/index.html', html); // matik nang triggered ito kapag nag-gulp
  gulp.watch('./app/assets/styles/**/*.css', gulp.series(styles, cssInject));
};

exports.default = gulp.series(html, watch);

var config = {
  mode: {
    css: {
      render: {
        css: {
          template: './app/temp/sprite-template.css'
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

exports.createSprite = gulp.series(createSprite);

/*
how to deal with -bash: gulp: command not found

1. npm uninstall -g gulp gulp-cli
2. delete local node_modules folder
3. npm install -g gulp gulp-cli
4. npm install
5. source ~/.profile
6. cd to/your/working/directory
7. gulp

got to point gulp the source everytime you use a new terminal window
future projects can start at step 3
*/