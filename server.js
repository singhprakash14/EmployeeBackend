const express = require("express");
require("dotenv").config();
const connect=require("./config/db")
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");
const morgan = require("morgan");
const port = process.env.PORT || 8000;


const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", employeeRoutes);
    

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


    app.listen(port, async() => {
        await connect();
        console.log("Server started at port " + port);

    });


