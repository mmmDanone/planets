import {RuleSetRule} from 'webpack';
import styleLoader from '../loaders/style';
import cssLoader from '../loaders/css';
import postCSSLoader from '../loaders/postCSS';
import lessLoader from '../loaders/less';

export default (): RuleSetRule => {
  return {
    test: /\.module\.less$/,
    use: [styleLoader(), cssLoader(true, 2), postCSSLoader(), lessLoader()]
  };
};
