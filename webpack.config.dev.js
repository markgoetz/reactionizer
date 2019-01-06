const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  exclude: [/node_modules/, /\.spec\.js/],
};

module.exports = {
  entry: `${PATHS.src}/entry.jsx`,
  mode: 'development',
  output: {
    path: PATHS.dist,
    filename: 'js/reactionizer.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: PATHS.exclude,
      use: { loader: 'babel-loader' },
    },
    {
      test: /\.scss$/,
      exclude: PATHS.exclude,
      use: [
        MiniCSSExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    },
    {
      test: /\.svg$/,
      use: {
        loader: 'svg-sprite-loader',
        options: { symbolId: 'logo-[name]' },
      },
    },
    {
      test: /\.png$|\.jpg$|\.woff2?$/,
      use: {
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      },
    }],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/reactionizer.css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist/',
  },
};
