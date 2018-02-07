/* global require process module __dirname */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP = require('./app.json');

const ENV = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV !== 'production';

console.log(`building for '${ENV}' environment`);

const htmlConfig = {
  title: APP.title,
  description: APP.description,
  template: path.join(__dirname, 'static', 'index.html'),
  minify: {
    collapseWhitespace: true,
    removeComments: ENV === 'production',
  },
};

const plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
  new HtmlWebpackPlugin(htmlConfig),
  new ExtractTextPlugin('styles.css'),
];

if (ENV === 'production' && APP['200']) {
  plugins.push(new HtmlWebpackPlugin({
    ...htmlConfig,
    filename: '200.html',
  }));

  plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: {
      drop_debugger: true,
    },
  }))
}

const config = {
  context: path.resolve(__dirname, 'src'),
	entry: './index.jsx',

  output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js',
	},

  externals: {
    preact: 'preact',
    'preact-router': 'preactRouter',
  },

  resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
  },

  module: {
    rules: [
      {
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env', 'react' ],
            },
          },
        ],
			},
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: CSS_MAPS,
                minimize: ENV === 'production',
                localIdentName: ENV === 'production' ? '[sha1:hash:hex:3]' : '[path][name]__[local]--[sha1:hash:hex:3]',
              },
            },
            {
              loader: 'less-loader',
              options: { sourceMap: CSS_MAPS },
            },
          ],
        }),
      },
    ],
  },

  plugins,

  devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',

  devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: path.join(__dirname, 'build'),
    compress: true,
		historyApiFallback: true,
		open: true,
		openPage: '',
	},
};

module.exports = config;
