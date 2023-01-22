const express = require("express");

// import DB connection file
const DbConnection = require("./databaseConnection");

// import db 
const dotenv = require("dotenv");

// const { UserModel, BookModel } = require("./models");


// import routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running succesfully",
  
  });
});




app.use("/users", usersRouter);
app.use("/books", booksRouter);




app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});