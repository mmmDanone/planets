import webpack from 'webpack';
import webpackConfig from '../config/webpack.config';
import getVoidLines from './assets/getVoidLines';
import clearLine from './assets/clearLine';
import {fgYellow, fgReset, boldOn, boldOff} from './assets/codesANSI';

const wpc = webpack(webpackConfig, (error, stats) => {
  clearLine();
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }

  process.stdout.write(stats!.toString(webpackConfig.stats) + '\n');
});

wpc.hooks.thisCompilation.tap('MyPlugin', () => {
  getVoidLines();
  process.stdout.write(boldOn + fgYellow + 'Compiling...' + fgReset + boldOff);
});
