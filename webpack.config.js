const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: {
    index: './developer/home/scripts.js',
    404: './developer/404/scripts.js'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    assetModuleFilename: 'asset/[name].webp'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './developer/home/template.pug',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './developer/404/template.pug',
      filename: '404.html',
      chunks: ['404']
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
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        use: 'babel-loader',
        test: /.(js)$/,
        exclude: /node_modules/
      },
      {
        type: 'asset/resource',
        test: /\.(jpe?g|png|gif)$/i,
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 
        [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizerOptions: {
                plugins: 
                [
                  ['gifsicle', { interlaced: false }],
                  ['mozjpeg', { quality: 80 }],
                  [
                    'imagemin-svgo',
                    {
                      plugins: [
                        {
                          removeViewBox: false,
                        },
                      ],
                    },
                  ],
                  'pngquant',
                  'imagemin-webp'
                ],
              },
            },
          },
        ],
      }
    ]
  }
}
