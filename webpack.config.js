const webpack = require('atool-build/lib/webpack');

module.exports = function(webpackConfig) {
  webpackConfig.externals = {
    jquery: "jQuery",
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
