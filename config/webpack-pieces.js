const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OpitmizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const postCssPresetEnv = require('postcss-preset-env');

exports.devServer = () => ({
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    open: true,
    stats: 'errors-only',
  },
});

exports.loadHtml = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});

exports.loadJavascript = ({ include } = {}) => ({
  module: {
    rules: [
      {
        include,
        test: /\.jsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              useEslintrc: true,
            },
          },
        ],
      },
    ],
  },
});

exports.loadStyles = ({ include } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        include,
        use: ['style-loader', 'css-loader', 'fast-sass-loader'],
      },
    ],
  },
});

exports.extractStyles = ({ include, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        use: [MiniCssExtractPlugin.loader, 'css-loader', ...use],
      },
      {
        test: /\.scss$/,
        include,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'fast-sass-loader',
          ...use,
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
    }),
  ],
});

exports.transformCss = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: [postCssPresetEnv()],
  },
});

exports.minifyStyles = ({ cssNanoConfig }) => ({
  plugins: [
    new OpitmizeCssPlugin({
      cssProcessorPluginOptions: cssNanoConfig,
    }),
  ],
});

exports.loadImages = ({ include, options } = {}) => ({
  module: {
    rules: [
      {
        test: /(.jpe?g|.svg|.png)$/,
        include,
        use: [
          {
            loader: 'url-loader',
            options,
          },
        ],
      },
    ],
  },
});
