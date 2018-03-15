const path = require('path');

module.exports = {
	mode: "development",
	entry: {
		dev: "./src/dev.ts",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "devBuild/build")
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader" }
		]
	},
};