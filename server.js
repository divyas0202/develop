// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "*"
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
  // Add below mongoose connection

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
  });
  
  const User = mongoose.model("User", UserSchema);

  app.post("/add-user", async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });