import path from 'path';
const __dirname = path.resolve();
import getIP from './assets/getIP';

export default <const>{
  root: __dirname,
  publicURL: '',
  mainEntry: path.resolve(__dirname, 'src/index.tsx'),
  srcPath: path.resolve(__dirname, 'src'),
  publicPath: path.resolve(__dirname, 'public'),
  tplHTML: path.resolve(__dirname, 'public/index.html'),
  output: path.resolve(__dirname, 'build'),
  ipAddresses: getIP(),
  IP: '0.0.0.0',
  PORT: 3000
};
