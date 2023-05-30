import {WebpackPluginInstance} from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

export default (): WebpackPluginInstance => {
  return new ESLintPlugin({
    extensions: ['ts', 'tsx'],
    failOnError: true,
    failOnWarning: false
  });
};
