const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//   console.log('---new chunk---');
//   console.log(chunk);
//   writeStream.write('\nNEW CHUNCK\n');
//   writeStream.write(chunk);
// })

// Simplified code above
readStream.pipe(writeStream);