// server.js

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const PAGE_FILE = "page.json";

app.use(bodyParser.json());
app.use(cors());

// Endpoint to fetch the page
app.get(`/api/page`, (req, res) => {
	try {
		const page = JSON.parse(fs.readFileSync(PAGE_FILE, "utf8"));
		res.json(page);
	} catch (error) {
		console.error("Error fetching page:", error);
		res.status(500).send("Error fetching page");
	}
});

// Endpoint to save the page
app.post(`/api/page`, (req, res) => {
	try {
		const updatedPage = req.body;
		fs.writeFileSync(PAGE_FILE, JSON.stringify(updatedPage, null, 2));
		res.status(200).send("Page saved successfully");
	} catch (error) {
		console.error("Error saving page:", error);
		res.status(500).send("Error saving page");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
