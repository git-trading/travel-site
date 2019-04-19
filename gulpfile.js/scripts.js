const gulp = require('gulp'),
webpack = require('webpack');

function scripts(cb) {
  // point to where the config file is relative to this task
  return webpack(
    require("../webpack.config.js"),
    function(err, stats) {
      // error handling feature of webpack
      if (err) {
        console.log(err.toString());
      }
      console.log(stats.toString());
      cb();
    }
  );
}

exports.scripts = gulp.series(scripts);