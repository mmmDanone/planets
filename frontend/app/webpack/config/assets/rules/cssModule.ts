import {RuleSetRule} from 'webpack';
import styleLoader from '../loaders/style';
import cssLoader from '../loaders/css';
import postCSSLoader from '../loaders/postCSS';

export default (): RuleSetRule => {
  return {
    test: /\.module\.css$/,
    use: [styleLoader(), cssLoader(true, 1), postCSSLoader()]
  };
};
