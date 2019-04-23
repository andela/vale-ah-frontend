const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
require('dotenv').config();

const {
  devServer,
  extractStyles,
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
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
      }),
    ],
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
    devtool: 'source-map',
    output: {
      filename: 'bundle.[chunkhash:8].js',
      publicPath: '/',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            output: {
              beautify: false,
              comments: false,
            },
          },
        }),
      ],
    },
    plugins: [new ImageminPlugin({ test: /\.(jpe?g|png|svg)$/i })],
  },
  loadImages({ options: { limit: 5000 } }),
  extractStyles(),
]);

module.exports = env =>
  merge(baseConfig, env !== 'production' ? devConfig : prodConfig, {
    mode: env,
  });
