const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();


//database connecton 
connectDb();

//middleware to parse the json data
app.use(express.json()); 

//setting up the routes
app.use("/api/contacts", require("./routes/contactRoutes")); 
app.use("/api/users", require("./routes/userRoutes"));


//middleware to handle errors
app.use(errorHandler); 



//connection to the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
