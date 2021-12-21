const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: 'ts-loader',
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'webpack5-vue3-project',
    template: path.resolve(__dirname, './index.html'),
  })],
}