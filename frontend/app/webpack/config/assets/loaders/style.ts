import {RuleSetUseItem} from 'webpack';
import {isProd} from '../../mode';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (): RuleSetUseItem => {
  return {
    loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
  };
};
