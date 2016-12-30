const webpack = require('atool-build/lib/webpack');

module.exports = function(webpackConfig) {
  webpackConfig.externals = {
    jquery: "jQuery",
  };

  webpackConfig.htmlWebpackPlugin = {
    files: {
      js: [
        'https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js'
      ]
    }
  };

  // disable common
  webpackConfig.plugins.some(function(plugin, i){
    if(plugin instanceof webpack.optimize.CommonsChunkPlugin) {
      webpackConfig.plugins.splice(i, 1);
      return true;
    }
  });

  return webpackConfig;
};
