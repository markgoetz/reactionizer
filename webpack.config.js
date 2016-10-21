var PATHS = {
	src: "./src/",
	src_js: "./src/js/",
	dist: "./dist/",
	exclude: [/node_modules/, /\.spec\.js/]
};

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: PATHS.src_js + "interface.jsx",
	output: {
		path: PATHS.dist,
		filename: "reactionizer.js"
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
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("css-loader", "sass-loader")
		}]
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	}
};