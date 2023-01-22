const express = require("express")
const { books } = require("../data/books.json");
const {users} = require("../data/users.json");
// const { route } = require("./users");

// import models
// const { UserModel, BookModel } = require("..models/");

const router= express.Router();


// books-get all the books

router.get(getAllbooks);


// get books by their id
router.get("/:id",(req,res)=>{
    const{id} = req.params;

    const book =books.find((each)=> each.id===id);
    if (!book)
    return res.status(404).json({ success: false, message: "Book not found" });

  return res.status(200).json({ success: true, data: book });
});

// get all issued books
router.post("/",(req,res)=> {
    const{data}= req.body

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data Was Provided",
        });
    }
    const book = books.find((each) => each.id === data.id);

    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exists with the same Id",
          });
        }

        const allBooks = [...books, data];
        return res.status(200).json({
            success: true,
            data: allBooks,
        });
});

// updating a 
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
  
    const book = books.find((each) => each.id === id);
  
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book not found with that particular Id",
      });
    }
    const UpdatedData = books.map((each) => {
      if (each.id === id) {
        return { ...each, ...data };
      }
      return each;
    });
    return res.status(200).json({
      success: true,
      data: UpdatedData,
    });
  });
  



module.exports = router;