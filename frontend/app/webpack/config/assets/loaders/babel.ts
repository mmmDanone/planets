import {RuleSetUseItem} from 'webpack';
import {isDev, isWebPackDevServer} from '../../mode';

export default (): RuleSetUseItem => {
  const OptionsPresetENV = {
    loose: true,
    useBuiltIns: 'usage',
    corejs: '3.30'
  };

  const presets = [
    ['@babel/preset-env', OptionsPresetENV]
    // '@babel/preset-react'
    // '@babel/preset-typescript'
  ];

  const plugins = [isDev && isWebPackDevServer && 'react-refresh/babel'].filter(Boolean);

  return {
    loader: 'babel-loader',
    options: {
      presets: presets,
      plugins: plugins
    }
  };
};
