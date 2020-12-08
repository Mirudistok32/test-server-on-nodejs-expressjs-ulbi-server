const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const app = express();

// Парсим json, который прилетает к нам в запросах
app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anime:anime@cluster0.djo4l.mongodb.net/test-server-on-nodejs-expressjs-ulbi?retryWrites=true&w=majority"
    );

    app.listen(PORT, () => {
      console.log(`Server start on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
