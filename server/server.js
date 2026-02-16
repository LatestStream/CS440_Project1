const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// temporary "database"
const users = []; // each user = { username, password }

// tell server where frontend files live
app.use(express.static(path.join(__dirname, "../client")));

// routes
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"../client/pages/login.html"));
});


app.get("/dashboard", (req,res)=>{
    res.sendFile(path.join(__dirname,"../client/pages/dashboard.html"));
});

app.get("/signup", (req,res)=>{
    res.sendFile(path.join(__dirname,"../client/pages/signup.html"));
});

app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.json());

// Signup route
app.post("/signup", (req, res) => {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if(existingUser) {
        return res.send("Username already exists!");
    }

    // Chekc if email already exists
    const existingEmail = users.find(u => u.email === email)
    if(existingEmail)
    {
        return res.send("Email already registered")
    }

    // Add user
    users.push({ email, username, password });
    res.send("Signup successful! You can now <a href='/'>Login</a>.");
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if(user) {
        // For now, just redirect to dashboard
        return res.redirect("/dashboard");
    } else {
        return res.send("Invalid username or password. <a href='/'>Try again</a>.");
    }
});

app.listen(PORT, ()=>{
    console.log("Server running on http://localhost:" + PORT);
});

