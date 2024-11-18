const express = require("express");
const path = require("path");
const fs = require("fs");

// Variables
const PORT = 3000;
const app = express(); // Express server

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get("/", (request, response) => {
    const formFile = path.resolve(__dirname, "form.html");

    // Error handling for missing form.html
    fs.access(formFile, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("Form file not found:", err);
            return response.status(500).send("Internal Server Error");
        }

        response.status(200).sendFile(formFile);
    });
});

app.get("/users", (request, response) => {
    const usersFile = path.resolve(__dirname, "users.json");

    // Error handling for missing or unreadable users.json
    fs.readFile(usersFile, 'utf-8', (err, usersRead) => {
        if (err) {
            console.error("Error reading users file:", err);
            return response.status(500).send("Failed to load users data.");
        }

        try {
            const users = JSON.parse(usersRead); // Parse users data
            response.render("users", { users });
        } catch (parseError) {
            console.error("Error parsing users JSON:", parseError);
            return response.status(500).send("Error parsing users data.");
        }
    });
});

app.post("/create-user", (request, response) => {
    const username = request.body.username;

    // Check if username is provided
    if (!username) {
        console.error("Username not provided");
        return response.status(400).send("Username is required");
    }

    console.log(username);
    response.redirect("/");
});

// Error handling middleware for unexpected errors
app.use((err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).send("Something went wrong, please try again later.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
