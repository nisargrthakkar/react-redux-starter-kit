/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        enforce: 'pre',
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2017', 'react', 'stage-2']
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
};

