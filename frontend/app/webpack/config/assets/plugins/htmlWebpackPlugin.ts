import {WebpackPluginInstance} from 'webpack';
import {isProd} from '../../mode';
import paths from '../../paths';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new HTMLWebpackPlugin({
    inject: 'body',
    template: paths.tplHTML,
    minify: {
      collapseWhitespace: isProd,
      removeComments: isProd
    }
  });
};
