const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const Product = require('./models/product.model');
const PORT = 3000;
 
app.get('/', (req,res) => {
  res.send(`Hello from port ${PORT} by Ariyan Nath`);
});

//get all products
app.get('/api/products', async (req,res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

//get a product by its id
app.get('/api/products/:id', async (req,res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

//create a product
app.post('/api/products', async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({message: error.message});
  }
})

//update a product
app.put('/api/products/:id', async (req,res) => {
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
      return res.status(404).json({message: "Product not found!"});
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
})

//delete a product
app.delete("/api/products/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: "Product not found!"})
    }
    res.status(200).json({message: "product deleted sussessfully!"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

mongoose.connect("mongodb+srv://ariyannath54321_db_user:ecx7txFUK9QdM4hW@backenddb.pxxlhrg.mongodb.net/Node-API?appName=BackendDB")
.then(() => {
  console.log("Connected to DataBase!!");
  app.listen(PORT, () => {
  console.log(`The server is running at port: ${PORT}\n`);
})
})
.catch(() => {
  console.log("Connection fail!!!\n");
})