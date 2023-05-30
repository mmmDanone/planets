import paths from '../config/paths';
import webpack from 'webpack';
import WebpackDevServ from 'webpack-dev-server';
import webpackConfig from '../config/webpack.config';
import {fgYellow, fgReset, boldOn, boldOff} from './assets/codesANSI';
import clearLine from './assets/clearLine';
import printIPAddresses from './assets/printIPAddresses';
import getVoidLines from './assets/getVoidLines';

const wpc = webpack(webpackConfig);

const server = new WebpackDevServ(
  {
    host: paths.IP,
    port: paths.PORT,
    client: {
      logging: 'none',
      overlay: {
        errors: false,
        warnings: false
      }
    },
    static: {
      directory: paths.publicPath,
      watch: true
    },
    historyApiFallback: true,
    hot: true,
    liveReload: false
  },
  wpc
);

const startServer = async () => {
  printIPAddresses();
  await server.start();
};

startServer();

wpc.hooks.thisCompilation.tap('MyPlugin', () => {
  getVoidLines();
  process.stdout.write(boldOn + fgYellow + 'Compiling...' + fgReset + boldOff);
});

wpc.hooks.done.tap('MyPlugin', () => {
  clearLine();
});
