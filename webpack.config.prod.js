const path = require('path');
/* eslint-disable */
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable */


const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  exclude: [/node_modules/, /\.spec\.js/],
};

module.exports = {
  entry: `${PATHS.src}/entry.jsx`,
  mode: 'production',
  output: {
    path: PATHS.dist,
    filename: 'js/reactionizer.js',
    publicPath: '/',
  },
  optimization: {
    minimize: true,
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
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ],
    },
    {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: { symbolId: 'logo-[name]' },
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [{ removeTitle: true }],
        },
      }],
    },
    {
      test: /\.png$|\.jpg$|\.woff2?$/,
      loader: 'file-loader',
      options: { name: '[name].[ext]' },
    }],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/reactionizer.css',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new Dotenv(),
    new HtmlWebpackPlugin({ title: 'Divisionizer' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
