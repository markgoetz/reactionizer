var PATHS = {
	src: "./src/",
	src_js: "./src/js/",
	dist: "./dist/",
	dist_js: "./dist/js/",
	dist_css: "./dist/css/",
	exclude: [/node_modules/, /\.spec\.js/]
};

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
	entry: PATHS.src_js + "entry.jsx",
	output: {
		path: PATHS.dist,
		filename: "js/reactionizer.js"
	},
	module: {
		loaders: [{
			test: /\.jsx$/,
			exclude: PATHS.exclude,
			loader: "babel",
			query: {
				presets: ["react"]
			}
		},
		{
			test: /\.scss$/,
			exclude: PATHS.exclude,
			loader: ExtractTextPlugin.extract("css!sass")
		}]
	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin("css/reactionizer.css"),
		new webpack.ProvidePlugin({
			"fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"
		})
	],
	resolve: {
		extensions: ["", ".js", ".jsx"]
	}
};