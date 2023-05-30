// TODO: create order config

import {WebpackPluginInstance} from 'webpack';
import StylelintPlugin from 'stylelint-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new StylelintPlugin({
    fix: false
  });
};
