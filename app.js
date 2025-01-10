const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes.js')

const app = express();

const dbURI =
	"mongodb+srv://jogo:jogo1234@cluster0.sd03q.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log("connected to DB"))
	.catch((error) => console.log(error));

app.listen(3000);

// middleware & static files
app.use((req, res, next) => {
	console.log("host: ", req.hostname);
	console.log("path: ", req.path);
	console.log("method: ", req.method);
	next();
});
app.use((req, res, next) => {
	console.log("in the next middleware");
	next();
});
// Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
	res.sendFile("./views/index.html", { root: __dirname });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});
