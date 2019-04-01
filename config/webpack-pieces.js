const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.devServer = () => ({
  devServer: {
    contentBase: './static',
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
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
        test: /\.(js|jsx)$/,
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
        use: ['style-loader', 'css-loader', 'fast-sass-loader'],
      },
    ],
  },
});

exports.loadImages = ({ include, options } = {}) => ({
  module: {
    rules: [
      {
        test: /(.jpg|.jpeg|.svg|.png)$/,
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
