const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require ("dotenv");

dotEnv.config({ path: "./config/.env" });

const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Router
app.use("/users",require("./routes/user"));
app.use("/wallet",require("./routes/wallet"));
app.use("/transaction",require("./routes/transaction"));

console.log("object");

app.listen(3000);