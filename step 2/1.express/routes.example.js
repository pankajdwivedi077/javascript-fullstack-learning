const express = require('express')

const app = express();

// root route
app.get('/', (req, res) => {
    res.send("welcome to our home page")
});

// get all products
app.get('/product', (req, res) => {
    const product = [
        {
            id: 1,
            label: "Product 1"
        },
        {
            id: 2,
            label: "Product 2"
        }
    ]
    res.json(product)
})

// get a single product

app.get('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id)
      const products = [
        {
            id: 1,
            label: "Product 1"
        },
        {
            id: 2,
            label: "Product 2"
        }
    ]
    const getSingleProduct = products.find((product) => product.id === productId);
    if(getSingleProduct){
        res.json(getSingleProduct)
    }else {
        res.status(404).send("product not found")
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`server running on ${port}`)
})