const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();

connectDb();
app.use(express.json()); //strem data that we receive from client side
const port =8001; //port=

// console.log("port",port)
app.use("/api/contacts",require("./routes/contactRoute"));
app.use("/api/users",require("./routes/usersRoute"));
app.use(errorHandler);
app.listen(8001, ()=>{
    console.log(`Server running on port ${port}`);
})