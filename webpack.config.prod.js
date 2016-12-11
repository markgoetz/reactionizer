var PATHS = {
	src: "./src/",
	dist: "./dist/",
	dist_js: "./dist/js/",
	dist_css: "./dist/css/",
	exclude: [/node_modules/, /\.spec\.js/]
};

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
	devtools: "",
	entry: PATHS.src + "entry.jsx",
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
		},
		{
			test: /\.json$/,
			exlude: PATHS.exclude,
			loader: "json"
		},
		{
			test: /\.svg$/,
			loaders: [
				"svg-sprite?name=logo-[name]",
				"svgo-loader?config=svgoConfig1"
			]
		}]
	},
	plugins: [
		new ExtractTextPlugin("css/reactionizer.css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ["module", "exports", "require"]
			}
		})
	],
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	svgoConfig1: {
		plugins:[
			{removeTitle:true}
		]
	}
};
