import {RuleSetRule} from 'webpack';
import styleLoader from '../loaders/style';
import cssLoader from '../loaders/css';
import postCSSLoader from '../loaders/postCSS';

export default (): RuleSetRule => {
  return {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: [styleLoader(), cssLoader(false, 1), postCSSLoader()]
  };
};
