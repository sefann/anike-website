console.log('Test output');
process.stdout.write('Direct stdout\n');
setTimeout(() => {
  console.log('After timeout');
  process.exit(0);
}, 1000);
