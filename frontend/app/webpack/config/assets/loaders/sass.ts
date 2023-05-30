import {RuleSetUseItem} from 'webpack';

export default (): RuleSetUseItem => {
  return {
    loader: 'sass-loader',
    options: {
      implementation: require('sass')
    }
  };
};
