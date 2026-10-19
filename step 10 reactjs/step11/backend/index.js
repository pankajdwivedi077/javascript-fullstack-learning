import express from "express"

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/products', (req, res)=>{
  const products =  [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "https://picsum.photos/seed/headphones/400/300",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    image: "https://picsum.photos/seed/smartwatch/400/300",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1499,
    image: "https://picsum.photos/seed/speaker/400/300",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 3499,
    image: "https://picsum.photos/seed/keyboard/400/300",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 999,
    image: "https://picsum.photos/seed/mouse/400/300",
  },
  {
    id: 6,
    name: "Laptop Backpack",
    price: 1299,
    image: "https://picsum.photos/seed/backpack/400/300",
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 799,
    image: "https://picsum.photos/seed/usbhub/400/300",
  },
  {
    id: 8,
    name: "Webcam HD",
    price: 1799,
    image: "https://picsum.photos/seed/webcam/400/300",
  },
];

  if (req.query.search){
   const filterProducts = products.filter(product => product.name.includes(req.query.search))
   res.send(filterProducts)
   return;
  }

  setTimeout(() => {
    res.send(products)
  }, 3000);

})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})