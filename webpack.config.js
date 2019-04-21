
const path = require("path");
module.exports = {
    entry: {
      app: './src/app.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    }
  };
