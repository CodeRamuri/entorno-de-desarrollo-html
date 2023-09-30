const path = require('path')
module.exports = {
  mode: 'development',
  //mode: 'production',
  devServer: {
    watchFiles: ['./developer/**/*', './public/**/*'],
    static: {
      directory: path.join(__dirname, 'public')
    },
    open: true,
    compress: true,
    port: 9000,
    hot: 'only',
    liveReload: false,
    magicHtml: true
  },
  entry: {
    index: './developer/home/scrips.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  }
}