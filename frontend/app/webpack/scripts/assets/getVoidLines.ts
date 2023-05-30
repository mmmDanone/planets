export default () => {
  const lines = process.stdout.getWindowSize()[1];
  for (let i = 0; i <= lines; i++) {
    process.stdout.write('\r\n');
  }
};
