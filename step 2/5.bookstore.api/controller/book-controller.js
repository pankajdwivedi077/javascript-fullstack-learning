const Book = require('../models/book');

const getAllBooks = async(req, res) => {
    try{

       const allBooks = await Book.find({});

       if(allBooks.length > 0){
        res.status(200).json({
            success: true,
            message: 'List of books feteched successfully',
            data: allBooks
        })
       }
       else{
        res.status(404).json({
            success: false,
            message: 'no books found in database'
        })
       }
    }catch (e){
        console.log("error in getAllBooks ", e);
        res.staus(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const getSingleBookById = async(req, res) => {
  try{

    const getCurrentBookId = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookId);

    if(!bookDetailsById){
        return res.status(404).json({
            success: false,
            message: 'Book with current id not found'
        })
    }else{
       res.status(200).json({
        success: true,
        data: bookDetailsById
       })
    }

  }catch(e){
      console.log("error in get SingleBook ", e);
        res.staus(500).json({
            success: false,
            message: 'Something went wrong'
        })
  }
}

const addNewBook = async(req, res) => {
  try{
     const newBookFormData = req.body;
     const newlyCreatedBook = await Book.create(newBookFormData);
     if (newlyCreatedBook) {
        res.status(201).json({
            success: true,
            message: 'Book added',
            data: newBookFormData 
        })
     }
  }catch(e){
    console.log("error in addNewBook ", e);
     res.staus(500).json({
            success: false,
            message: 'Something went wrong'
        })
  }
}

const updateBook = async(req, res) => {
  try{

    const updatedBookFormData = req.body;
    const getCurrentBookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(getCurrentBookId, updatedBookFormData, {new: true});

      if(!updatedBook){
        res.status(404).json({
            success: false,
            message: 'Book not found'
        })
      }

      res.status(200).json({
        success: true,
        message: 'Book updated',
        data: updatedBook
      })


  }catch (e){
     console.log("error in updateBook ", e);
     res.staus(500).json({
            success: false,
            message: 'Something went wrong'
        })
  }
}
const deleteBook = async(req, res) => {
    try{

      const getCurrentBookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);

      if(!deletedBook){
        res.status(404).json({
            success: false,
            message: 'Book not found'
        })
      }

      res.status(200).json({
        success: true,
        message: 'Book deleted',
        data: deletedBook
      })

  }catch (e){
     console.log("error in deleteBook ", e);
     res.staus(500).json({
            success: false,
            message: 'Something went wrong'
        })
  }
}

module.exports = {
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
};