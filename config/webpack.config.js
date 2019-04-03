const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const {
  autoPrefix,
  devServer,
  extractStyles,
  loadHtml,
  loadImages,
  loadJavascript,
  loadStyles,
  minifyStyles,
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
      filename: 'bundle.js',
    },
    plugins: [new Dotenv()],
  },
  loadHtml(),
  loadJavascript({ include: path.join(__dirname, '../src') }),
]);

const devConfig = merge([
  {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ErrorOverlayPlugin(),
    ],
  },
  devServer(),
  loadImages(),
  loadStyles(),
]);

const prodConfig = merge([
  {
    output: {
      filename: 'bundle.[chunkhash:8].js',
      publicPath: './',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  },
  extractStyles({ use: [autoPrefix()] }),
  minifyStyles({
    cssNanoConfig: {
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          cssDeclarationSorter: { order: 'smacss' },
        },
      ],
    },
  }),
  loadImages({ options: { limit: 5000 } }),
]);

module.exports = env =>
  merge(baseConfig, env === 'development' ? devConfig : prodConfig, {
    mode: env,
  });
