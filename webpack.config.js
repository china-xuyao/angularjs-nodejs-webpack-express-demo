var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');//单独打包HTML
var ExtractTextPlugin = require("extract-text-webpack-plugin");//单独打包CSS 

module.exports = {
  //插件项
  plugins: [commonsPlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin("css/styles.css")
  ],
  //页面入口文件配置
  entry: {
    index : './src/index.js',
    lib_all : './src/lib.js'
    // style : './styles/lib.less'
  },
  //入口文件输出配置
  output: {
    path: 'dist/',
    filename: 'js/[name].bundle.js'
  },  
  module: {
    //加载器配置
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015']//'react'
        }
      },
      // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }, 
      // { test: /\.scss$/, loader: "style!css!sass" }, 
      // { test: /\.less$/, loader: "style!css!less" }, 
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.(woff|woff2|ttf|eot|svg|map)$/, loader: 'file-loader?name=/css/[name].[ext]' }//字体样式加载
    ]
  },
  //其它解决方案配置
  resolve: {
    //root: 'E:/github/flux-example/src', //绝对路径
    extensions: ['', '.js', '.json', '.scss'],
    // alias: {
    //   AppStore : 'js/stores/AppStores.js',
    //   ActionType : 'js/actions/ActionType.js',
    //   AppAction : 'js/actions/AppAction.js'
    // }
  }
};