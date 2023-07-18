const express = require('express');
const db = require('./db');
const dotenv = require("dotenv");
const storageRoutes = require('./routes/storageRoutes');
const itemRoutes = require('./routes/itemroutes');
const itemTypeRoutes = require('./routes/itemTypesroutes');
dotenv.config();
const app = express();
db();
app.use(express.json());
app.use("/storageSpaces", storageRoutes);
app.use("/itemTypes", itemTypeRoutes);
app.use("/items", itemRoutes);
app.listen(process.env.PORT, ()=>{
    console.log("Listening to PORT: ", process.env.PORT);
})