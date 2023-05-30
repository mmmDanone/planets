import {RuleSetRule} from 'webpack';
import styleLoader from '../loaders/style';
import cssLoader from '../loaders/css';
import postCSSLoader from '../loaders/postCSS';
import sassLoader from '../loaders/sass';

export default (): RuleSetRule => {
  return {
    test: /\.s[ac]ss$/,
    exclude: /\.module\.s[ac]ss$/,
    use: [styleLoader(), cssLoader(false, 2), postCSSLoader(), sassLoader()]
  };
};
