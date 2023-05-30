import {WebpackPluginInstance} from 'webpack';
import ForkTSCheckerPlugin from 'fork-ts-checker-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new ForkTSCheckerPlugin({
    typescript: {
      configFile: '../tsconfig.json'
    }
  });
};
