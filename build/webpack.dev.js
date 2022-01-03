const { merge } = require('webpack-merge');

const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 9000
  },
});