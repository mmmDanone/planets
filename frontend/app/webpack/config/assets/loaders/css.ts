import {RuleSetUseItem} from 'webpack';

export default (module: boolean, importLoaders: number): RuleSetUseItem => {
  return {
    loader: 'css-loader',
    options: {
      importLoaders: importLoaders,
      ...(module && {
        modules: {
          localIdentName: '[local]--[hash:base64:5]'
        }
      })
    }
  };
};
