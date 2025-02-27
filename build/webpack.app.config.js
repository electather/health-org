const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = env => {
  return merge(base(env), {
    entry: {
      background: './src/background.js',
      app: './src/app.js',
      chart: './src/chart.js',
      validation: './src/validation.js',
      spread: './src/spread.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../app')
    }
  });
};
