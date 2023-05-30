import paths from '../../config/paths';
import {boldOn, boldOff, fgReset, fgBlue} from './codesANSI';

export default () => {
  process.stdout.write(fgBlue + boldOn + 'Available in the browser at:' + boldOff + fgReset + '\n');
  if (paths.IP === '0.0.0.0') {
    process.stdout.write('\t' + `http://localhost:${paths.PORT} or http://127.0.0.1:${paths.PORT}`);
    paths.ipAddresses.forEach((ip) => {
      process.stdout.write('\n\t' + `http://${ip}:${paths.PORT}`);
    });
  } else {
    if (paths.IP === 'localhost' || paths.IP === '127.0.0.1') {
      process.stdout.write('\t' + `http://localhost:${paths.PORT} or http://127.0.0.1:${paths.PORT}`);
    } else {
      process.stdout.write('\t' + `http://${paths.IP}:${paths.PORT}`);
    }
  }
};
