const path = require('path');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser")
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/build',
    },
    hot: true,
    port: 3000,
    open: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },


};

