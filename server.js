const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
connectDb();
app.use(express.json()); //middleware to parse the json data
app.use("/api/contacts", require("./routes/contactRoutes")); //setting up the routes
app.use(errorHandler); //middleware to handle errors
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
