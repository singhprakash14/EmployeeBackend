const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.mongodb_uri);
    console.log("Database connected:", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

module.exports = connect;
