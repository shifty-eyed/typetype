const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

var basePath = __dirname;

module.exports = {
	mode: "production",
	devtool: "source-map",
	entry: ["@babel/polyfill", "./src/main/ts/app.tsx"],
	output: {
		path: path.resolve(__dirname, 'target/classes/public'),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	optimization: {
		minimize: false
	},
	performance: {
		hints: false
	},
	watch: true,
	watchOptions: {
		ignored: ['files/**/*.js', 'node_modules/**'],
		 aggregateTimeout: 600
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "awesome-typescript-loader",
				options: {
					useBabel: true,
					babelCore: "@babel/core" // needed for Babel v7
				}
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: "assets/img/[name].[ext]?[hash]"
				}
			}
		],


	},

	plugins: [
		//Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: "index.html", //Name of file in ./dist/
			template: "./src/main/resources/public/index.html", //Name of template in ./src
			hash: true
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]/*,
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}*/
};