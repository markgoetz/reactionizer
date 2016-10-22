var PATHS = {
	src: "./src/",
	src_js: "./src/js/",
	dist: "./dist/",
	dist_js: "./dist/js/",
	dist_css: "./dist/css/",
	exclude: [/node_modules/, /\.spec\.js/]
};

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: PATHS.src_js + "interface.jsx",
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
	plugins: [
		new ExtractTextPlugin("css/reactionizer.css")
	],
	resolve: {
		extensions: ["", ".js", ".jsx"]
	}
};