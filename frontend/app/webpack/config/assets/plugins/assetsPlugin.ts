import {WebpackPluginInstance} from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new AssetsPlugin({useCompilerPath: true, filename: 'assets.json', entrypoints: true});
};
