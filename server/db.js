const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectionDb = require("./connection");
const users_collection = require("./Schema/user");
const registerValidation = require("./MiddleWare/SignUp.js");
const loginValidation = require("./MiddleWare/SignIn.js");

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3001" }));

// Connect to the database
connectionDb();

// Routes
app.post("/", loginValidation, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users_collection.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json({ status: "exists", user: user });
            } else {
                res.json({ status: "invalidpassword" });
            }
        } else {
            res.json({ status: "notexists" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

app.post("/signup", registerValidation, async (req, res) => {
    const { uname, email, password } = req.body;
    try {
        const check = await users_collection.findOne({ email: email });
        if (check) {
            res.json({ status: "exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const data = {
                uname,
                email,
                password: hashedPassword,
                cardNo: 0,
                deckNo: 0,
                loginTime: new Date(),
                updatedTime: new Date(),
                deleteStatus: false,
                activeStatus: true,
            };
            await users_collection.insertMany([data]);
            res.json({ status: "added" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

app.patch("/reset", loginValidation, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users_collection.findOne({ email });
        if (user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await users_collection.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
            res.status(200).json({ status: "PasswordResetSuccess" });
        } else {
            res.status(401).send({ status: "notexists" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

app.get("/user", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await users_collection.findOne({ userId: userId });
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});
