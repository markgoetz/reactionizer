const PATHS = {
	src: "./src/",
	dist: "./dist/",
	dist_js: "./dist/js/",
	dist_css: "./dist/css/",
	exclude: [/node_modules/, /\.test\.js/]
};

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	devtools: "",
	entry: PATHS.src + "entry.jsx",
	output: {
		path: path.resolve(__dirname, PATHS.dist),
		filename: "js/reactionizer.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: PATHS.exclude,
			loader: "babel"
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
			use: [
				{
					loader: "svg-sprite-loader",
					options: {
						symbolId: "logo-[name]"
					}
				},
				{
					loader: 'svgo-loader',
					options: {
						config: 'svgoConfig1'
					}
				}
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
		extensions: [".js", ".jsx"]
	},
	svgoConfig1: {
		plugins:[
			{removeTitle:true}
		]
	}
};
