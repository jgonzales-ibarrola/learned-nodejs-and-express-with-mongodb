const fs = require('fs');

// reading files
fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) {
    console.log(err);
  }

  console.log(data.toString());
})

console.log('last line');

// output: 
// last line
// Gojo Tosoru
// because fs.readFile is not async, it just go to the nextline if reading takes time