import os from 'os';

export default () => {
  const networkInterfaces = os.networkInterfaces();
  const ip: Array<string> = [];

  (Object.keys(networkInterfaces) as Array<keyof typeof networkInterfaces>).forEach(function (ifName) {
    networkInterfaces[ifName]!.forEach(function (networkInterface) {
      if ('IPv4' !== networkInterface.family || networkInterface.internal) {
        return;
      }

      ip.push(networkInterface.address);
    });
  });

  return ip;
};
