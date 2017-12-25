
const path = require('path')
//热加载
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清空
const CleanWebpackPlugin = require('clean-webpack-plugin')
//压缩js需要webpack
const webpack = require('webpack')
//复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
//压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default
//把css打包到一个文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry : './src/app.js',
  output:{
    filename:'build.js',
    path: path.resolve(__dirname,'./dist')
  },
  module: {
    rules:[
      {
        test: /vue-preview.src.*?js$/,
        use: 'babel-loader'
      },{
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,
        use: 'babel-loader'
      },{
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'autoprefixer-loader']
        })
        // use:['style-loader','css-loader','autoprefixer-loader']
      },{
        test:/\.less$/,
        use:['style-loader','css-loader','autoprefixer-loader','less-loader']
      },{
        test:/\.sass$/,
        use:['style-loader','css-loader','autoprefixer-loader','sass-loader']
      },{
        test:/\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '/statics/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '/statics/images/[name].[ext]'
            }
          }
        ]
      },{
        test:/\.vue$/,
        use:['vue-loader']
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title:'You are not alone',
      template: 'index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true, //去除换行和空格
        minifyCSS: true, //压缩html内的css
        minifyJS: true, //压缩html内的js
        removeComments: true //删除html注释
      }
    }),
    //压缩js文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: '/statics/css/style.css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    // Copy the images folder and optimize all the images
    new CopyWebpackPlugin([
      {
        from: 'statics/images',
        to: 'statics/images'
      }
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    })
  ]
}