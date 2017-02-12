var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');
var APP_ROOT = __dirname;

//noinspection JSUnresolvedFunction
module.exports = {
	entry: {
		vendor: [
			'!!script-loader!jquery/dist/jquery.min.js',
			'!!script-loader!foundation-sites/dist/js/foundation.min.js',
			'./app/app.jsx'
		]
	},
	externals: {
		jquery: 'jQuery',
		foundation: 'Foundation',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery',
			foundation: 'Foundation'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				sassLoader: {
					includePaths: [path.resolve(APP_ROOT, './node_modules/foundation-sites/scss')]
				},
				postcss: [
					autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
				]
			}
		})
	],
	output: {
		path: APP_ROOT + '/public/',
		filename: 'bundle.js',
		pathinfo: false
	},
	resolve: {
		modules: [
			__dirname,
			path.resolve(APP_ROOT, './node_modules'),
			path.resolve(APP_ROOT, './app/components/'),
			path.resolve(APP_ROOT, './app/api')
		],
		alias: {
			applicationStyles: path.resolve(APP_ROOT, './app/styles/app.scss'),
			foundation: path.resolve(APP_ROOT, './node_modules/foundation-sites/sass/foundation.scss')
		},
		extensions: ['.js', '.jsx'],
	},
	resolveLoader: {
		moduleExtensions: ['-loader']
	},
	performance: {
		hints: false
	},
	node: {
		fs: 'empty',
		child_process: 'empty'
	},
	module: {
		rules: [
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		{
			// 			loader: "style-loader"
			// 		},
			// 		{
			// 			loader: "css-loader",
			// 			options: {modules: true}
			// 		}
			// 	]
			// },
			{
				test: /\.scss$/,
				use: [
					{
						loader: "sass-loader",
						options: {modules: true},
					}
				],
				exclude: [/node_modules/] // sassLoader will include node_modules explicitly
			},
			{
				test: /\.jsx$/,
				loader: "babel-loader", // Do not use "use" here
				options: {
					presets: ['react', 'es2015', 'stage-0']
				},
				exclude: /(node_modules|bower_components)/
			},
			// fonts and svg
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			},
			{
				// images
				test: /\.(ico|jpe?g|png|gif)$/,
				loader: "file"
			}
		]
	},
	// target: 'node',
	devtool: 'cheap-module-eval-source-map'
};
