var PATHS = {
	src: "./src/",
	dist: "./dist/",
	dist_js: "./dist/js/",
	dist_css: "./dist/css/",
	exclude: [/node_modules/, /\.spec\.js/]
};

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: PATHS.src + "entry.jsx",
	output: {
		path: PATHS.dist,
		filename: "js/reactionizer.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: PATHS.exclude,
			loaders: ["babel"]
		},
		{
			test: /\.scss$/,
			exclude: PATHS.exclude,
			loader: ExtractTextPlugin.extract("css!sass")
		},
		{
			test: /\.json$/,
			exclude: PATHS.exclude,
			loader: "json"
		},
		{
			test: /\.svg$/,
			loader: "svg-sprite?name=logo-[name]"
		}]
	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin("css/reactionizer.css")
	],
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	devServer: {
		contentBase: "./dist/"
	}
};
