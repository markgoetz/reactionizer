const PATHS = {
  src: './src/',
  dist: './dist/',
  exclude: [/node_modules/, /\.spec\.js/],
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtools: '',
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
      loader: 'babel',
    },
    {
      test: /\.scss$/,
      exclude: PATHS.exclude,
      loader: ExtractTextPlugin.extract('css!sass'),
    },
    {
      test: /\.json$/,
      exlude: PATHS.exclude,
      loader: 'json',
    },
    {
      test: /\.svg$/,
      loaders: [
        'svg-sprite?name=logo-[name]',
        'svgo-loader?config=svgoConfig1',
      ],
    },
    {
      test: /\.png$|\.jpg$|\.woff2?$/,
      loader: 'file',
      options: {
        name: '[name].[ext]',
      },
    }],
  },
  plugins: [
    new ExtractTextPlugin('css/reactionizer.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['module', 'exports', 'require'],
      },
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  svgoConfig1: {
    plugins: [
      { removeTitle: true },
    ],
  },
};
