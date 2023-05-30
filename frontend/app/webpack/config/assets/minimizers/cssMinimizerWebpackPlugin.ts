import {WebpackPluginInstance} from 'webpack';
import {ICSSMinimizerOptions} from '../../types';
import {deviceFirst} from '../../mode';
import CSSMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import styleMinify from '../styleMinify';

export default (): WebpackPluginInstance => {
  return new CSSMinimizerWebpackPlugin<ICSSMinimizerOptions>({
    minimizerOptions: {
      deviceFirst: deviceFirst //galactic hack xD
    },
    //sourceMap: false,
    minify: styleMinify
  });
};
