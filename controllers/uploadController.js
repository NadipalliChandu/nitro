const fs = require("fs");
const csv = require("csv-parser");
const User = require("../models/User");

const uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  let users = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      users.push({
        name: row.name,
        email: row.email,
        age: parseInt(row.age, 10),
      });
    })
    .on("end", async () => {
      try {
        await User.insertMany(users, { ordered: false });
        res.json({ message: "CSV data uploaded successfully", count: users.length });
      } catch (err) {
        res.status(500).json({ message: "Error inserting data", error: err.message });
      }
    });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

module.exports = { uploadCSV, getUsers };
