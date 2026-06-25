const express = require('express');

const app = express();

// middleware
app.use(express.json()) // parse incoming data into javascript object

let products = [
  {
    id: "1",
    title: "Book1"
  },
  {
    id: "2",
    title: "Book2"
  }
];

// intro 
app.get('/', (req, res) =>{
    res.json({
        message: "Welcome to our bookstore api"
    })
})

// get all books
app.get('/get', (req, res) => {
    res.json(products)
})

// get single book
app.get('/get/:id', (req, res) => {
    const book = products.find(item => item.id === req.params.id);
    if (book){
      res.status(200).json(book)
    }else{
      res.status(404).json({
        message: "Book not found"
      })
    } 
})

// add a new book
app.post('/add', (req, res) => {
    const newBook = {
        id: String(products.length + 1),
        title: `Book ${products.length} + 1`
    }
    products.push(newBook)
    res.status(200).json({
        data: newBook,
        message: "new book added"
    })
})

// update a book
app.put('/update/:id', (req, res) => {
    const findCurrentBook = products.find(b => b.id === req.params.id)
    if (findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBook.title
        res.status(200).json({
            message: "book updated"
        })
    }else{
        res.status(404).json({
            message: "book not found"
        })
    }
})

// delete a book
app.delete('/delete/:id', (req, res) => {
    const findIndex = products.findIndex(item => item.id === req.params.id)
    if (findIndex !== -1){
        const deleteBook = products.splice(findIndex, 1);
        res.status(200).json({
            message: "Book deleted",
            data: deleteBook[0]
        })
    }else{
        res.status(404).json({
            message: "not found"
        })
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`server is runnning on ${port}`)
})