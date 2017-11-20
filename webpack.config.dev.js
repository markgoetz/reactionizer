var PATHS = {
	src: "./src/",
	dist: "dist/",
	dist_js: "dist/js/",
	dist_css: "dist/css/",
	exclude: [/node_modules/, /\.spec\.js/]
};

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: PATHS.src + "entry.jsx",
	output: {
		path: path.resolve(__dirname, PATHS.dist),
		filename: "js/reactionizer.js"
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: PATHS.exclude,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.scss$/,
			exclude: PATHS.exclude,
			use: ExtractTextPlugin.extract({
				use: [
					"css-loader",
					"sass-loader"
				]
			})
		},
		{
			test: /\.svg$/,
			use: {
				loader: "svg-sprite-loader",
				options: {
					symbolId: "logo-[name]"
				}
			}
		}]
	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin("css/reactionizer.css")
	],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		contentBase: "./dist/"
	}
};
