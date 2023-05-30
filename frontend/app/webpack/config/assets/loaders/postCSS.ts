import {RuleSetUseItem} from 'webpack';
import {isDev, deviceFirst} from '../../mode';

export default (): RuleSetUseItem => {
  return {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          ['autoprefixer'],
          isDev && ['postcss-combine-media-query'],
          isDev && ['postcss-sort-media-queries', {sort: deviceFirst}]
        ].filter(Boolean)
      }
    }
  };
};
