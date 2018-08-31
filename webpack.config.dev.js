const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: './src/',
  dist: './dist/',
  exclude: [/node_modules/, /\.spec\.js/],
};

module.exports = {
  entry: `${PATHS.src}entry.jsx`,
  output: {
    path: PATHS.dist,
    filename: 'js/reactionizer.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: PATHS.exclude,
      loaders: ['babel'],
    },
    {
      test: /\.scss$/,
      exclude: PATHS.exclude,
      loader: ExtractTextPlugin.extract('css!sass'),
    },
    {
      test: /\.json$/,
      exclude: PATHS.exclude,
      loader: 'json',
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite?name=logo-[name]',
    },
    {
      test: /\.png$|\.jpg$|\.woff2?$/,
      loader: 'file',
      options: {
        name: '[name].[ext]',
      },
    }],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('css/reactionizer.css'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist/',
  },
};
