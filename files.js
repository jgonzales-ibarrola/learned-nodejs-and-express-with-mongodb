const fs = require("fs");

// reading files
// fs.readFile("./docs/blog1.txt", (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	console.log(data.toString());
// });

// console.log("last line");

// output:
// last line
// Gojo Tosoru
// because fs.readFile is not async, it just go to the nextline if reading takes time

// writing files
// fs.writeFile("./docs/blog1.txt", "A new line of text!", () => {
// 	console.log("file was written!");
// });

// fs.writeFile("./docs/blog2.txt", "A new file has been created!", () => {
// 	console.log("A new file has been created!");
// });

// directories
if (!fs.existsSync('./assets')) {
	fs.mkdir("./assets", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Folder Created");
	});
} else {
	fs.rmdir("./assets", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Folder Deleted");
	});
}