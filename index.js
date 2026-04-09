const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const PORT = 3000;

app.get('/', (req,res) => {
  res.send(`Hello from port ${PORT} by Ariyan Nath`);
});

app.post('/api/products', (req, res) => {
  console.log(req.body);
  res.send(req.body);
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