import {RuleSetUseItem} from 'webpack';

export default (): RuleSetUseItem => {
  return {
    loader: '@svgr/webpack',
    options: {
      ref: true
    }
  };
};
