import {Configuration} from 'webpack';
import {isDev, isWebPackDevServer, isProd} from '../mode';
import paths from '../paths';

import HTMLWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

export default () => {
  const plugins: Configuration['plugins'] = [
    new HTMLWebpackPlugin({
      inject: 'body',
      template: paths.tplHTML,
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd
      }
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      failOnError: false,
      failOnWarning: false
    })
  ];

  if (isDev && isWebPackDevServer) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCSSExtractPlugin({
        filename: 'static/styles/style_[contenthash].css',
        chunkFilename: 'static/styles/[name]_chunk_[contenthash].css',
        linkType: false,
        ignoreOrder: false
      })
    );
  }

  return plugins;
};
