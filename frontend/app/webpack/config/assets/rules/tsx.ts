import {RuleSetRule} from 'webpack';
import babelLoader from '../loaders/babel';
import tsxLoader from '../loaders/tsx';

export default (): RuleSetRule => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [babelLoader(), tsxLoader()]
  };
};
