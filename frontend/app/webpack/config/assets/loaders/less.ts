import {RuleSetUseItem} from 'webpack';

export default (): RuleSetUseItem => {
  return {
    loader: 'less-loader'
  };
};
