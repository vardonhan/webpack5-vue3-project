const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = { 
  entry: './src/index.ts',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack5-vue3-project',
      template: './index.html',
    }),
    new Webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
}