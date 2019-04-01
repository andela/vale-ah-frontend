const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const {
  devServer,
  loadHtml,
  loadImages,
  loadJavascript,
  loadStyles,
} = require('./webpack-pieces');

const baseConfig = merge([
  {
    entry: './src/index.jsx',
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },

    output: {
      path: path.resolve(__dirname, '../build'),
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
  },
  loadStyles(),
  loadHtml(),
  loadJavascript({ include: path.join(__dirname, '../src') }),
]);

const devConfig = merge([
  {
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  devServer(),
  loadImages(),
]);

const prodConfig = merge([
  {
    output: {
      path: path.resolve(__dirname, '../build'),
      publicPath: './',
      filename: 'bundle.[hash].js',
    },
    devServer: {
      historyApiFallback: true,
    },
  },
  loadImages({ options: { limit: 5000 } }),
]);

module.exports = mode =>
  merge(baseConfig, mode === 'development' ? devConfig : prodConfig, { mode });
