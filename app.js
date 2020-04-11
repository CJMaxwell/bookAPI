const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const bookRouter = require('./Routes/bookRouter')(Book);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb://localhost/bookAPI';
const db = mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});
app.use('/api/v1', bookRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
