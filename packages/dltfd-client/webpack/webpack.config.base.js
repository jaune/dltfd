const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function applyCommonjs(modules) {
  return modules.reduce(function (modules, moduleName) {
    modules[moduleName] = 'commonjs ' + moduleName;
    return modules;
  }, {});
}

module.exports = [];

module.exports.push({
  entry: {
    'main': __dirname + '/../index.web.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/../dist/web',
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|dltfd-routing)/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_BASE_URL': JSON.stringify('https://localhost')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'stats.json'
    })
  ]
});

module.exports.push({
 entry: {
   'index': __dirname + '/../index.node.js'
 },
 devtool: 'sourcemap',
 target: 'node',
 output: {
   libraryTarget: 'commonjs',
   path: __dirname + '/../dist/node',
   filename: '[name].bundle.js',
   chunkFilename: '[id].chunk.js'
 },
 externals: applyCommonjs([
   'react',
   'react-redux',
   'react-router',
   'react-router-redux',
   'redux'
 ]),
 module: {
   loaders: [
     {
       test: /.jsx?$/,
       loader: 'babel-loader',
       exclude: /(dltfd-routing)/
     }
   ]
 },
 plugins: [
   new webpack.DefinePlugin({
     'process.env.PUBLIC_BASE_URL': JSON.stringify('https://localhost')
   }),
   new BundleAnalyzerPlugin({
     analyzerMode: 'static',
     reportFilename: 'report.html',
     openAnalyzer: false,
     generateStatsFile: true,
     statsFilename: 'stats.json'
   })
 ]
});
