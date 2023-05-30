import {WebpackPluginInstance} from 'webpack';
import TerserWebpackPlugin from 'terser-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new TerserWebpackPlugin({
    terserOptions: {
      format: {
        comments: false
      }
    },
    extractComments: false
  });
};
