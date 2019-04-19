const path = require('path');

module.exports = {
  entry: "./app/assets/scripts/App.js",
  mode: "development",
  output: {
    filename: "App.js",
    path: path.resolve(__dirname, "./app/temp/scripts")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }  
};