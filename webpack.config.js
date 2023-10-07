// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import url from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(dirname, 'dist'),
    host: 'localhost',
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './src/assets/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': JSON.stringify(process.env.RUNTIME_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
};

export default config;
