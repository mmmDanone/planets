import {WebpackPluginInstance} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new ReactRefreshWebpackPlugin();
};
