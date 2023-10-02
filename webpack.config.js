const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  //mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  module:{
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use:[
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        use: 'babel-loader',
        test: /.(js)$/,
        exclude: /node_modules/
      }
    ]
  }
}
