import {RuleSetUseItem} from 'webpack';

export default (): RuleSetUseItem => {
  return {
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
  };
};
