const Author = require('../models/author');
const Book = require('../models/kitab');

const createAuthor = async(req,res)=> {
    try{
     
      const author = new Author(req.body);
      await author.save();

      res.status(201).json({
        success: true,
        data: author
      })

    }catch(e){
        console.log("something went wrong in createAuthor ", e)
        res.status(500).json({
            success: false,
            message: "error in createAuthor"
        })
    }
}

const createBook = async(req,res)=> {
    try{
     
      const book = new Book(req.body);
      await book.save();

      res.status(201).json({
        success: true,
        data: book
      })

    }catch(e){
        console.log("something went wrong in createAuthor ", e)
        res.status(500).json({
            success: false,
            message: "error in createAuthor"
        })
    }
}

const getBookWithAuthor = async(req,res) => {
    try{
      
        const book = await Book.findById(req.params.id).populate('author');

        if (!book){
            return res.status(400).json({
                success: false,
                message: 'Book not found'
            })
        }

        res.status(200).json({
            success: true,
            data: book
        })

    }catch (e){
        console.log("something went wrong in getBookWithAuthor ", e)
        res.status(500).json({
            success: false,
            message: "error in getBookWithAuthor"
        })
    }
}

module.exports = {
    createBook,
    createAuthor,
    getBookWithAuthor
}