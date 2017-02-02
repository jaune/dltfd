const webpack = require('webpack');

let base = require('./webpack.config.base.js');

module.exports = base.map(function (config) {
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ].concat(config.plugins);

  return config;
})
