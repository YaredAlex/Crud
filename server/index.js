const express = require("express");
const mongoose = require("mongoose");
const handleRoutes = require("./routes");
const createErrors = require('http-errors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const path = require('path')
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
	cookie: { maxAge: 1000 * 60 * 60 * 60 * 24 },
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}))
app.use(express.static(path.join(__dirname, '../build')))
app.use(/^(?!\/api).+/, (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})
app.use("/api", handleRoutes());
app.use((req, res, next) => {
	return next(createErrors(404, 'page Not found'));
});
app.use((err, req, res, next) => {
	res.send(
		`<h5 style="text-align:center;">${err.message}</h5>`
	);
})
async function run() {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(
			process.env.MONGO_URL,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(res => {
			app.listen(PORT, () => {
				console.info(`listening on ${PORT}`);
			});
		})
		.catch(e => console.log(e));
}
run();