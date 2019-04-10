// when importing, kailangan ng object pointer.
// must be the same with the export name
var watch = require('./watch.js').watch;
// default gulp command is watch, just type: gulp
exports.default = watch;

// less verbose import-export:
exports.createSprite = require('./sprites.js').createSprite;

exports.copySpriteCSS = require('./sprites.js').copySpriteCSS;

exports.styles = require('./styles.js').styles;

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