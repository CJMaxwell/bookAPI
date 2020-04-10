const express = require('express');
//const booksController = require('../controller/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  //const controller = booksController(Book);
  bookRouter.route('/books')
    .get((req,res) => {
      Book.find((err, books) => {
        if(err) {
          return res.status(404).send(err);
        };
        return res.status(200).json(books);
      });
      
    })
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    });

  bookRouter.use('/books/:bookId',(req, res, next) => {
    Book.findById(req.params.bookId,(err, book) => {
      if(book) {
        req.book = book;
        return next();
      };
      return res.status(404).json({
        message: 'Book not found'
      });
    })
  })

  bookRouter.route('/books/:bookId')
    .get((req,res) => res.status(200).json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.author = req.body.author;
      book.country = req.body.country;
      book.imageLink = req.body.imageLink;
      book.language = req.body.language;
      book.link = req.body.link;
      book.pages = req.body.pages;
      book.title = req.body.title;
      book.year = req.body.year;
      book.save(err => {
        if(err) {
          return res.status(400).json({
            message: 'Book was not updated'
          })
        }
        return res.status(200).json(book)
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if(req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save(err => {
        if(err) {
          return res.status(400).json({
            message: 'Book was not updated'
          })
        }
        return res.status(200).json(book)
      });
    })
    .delete((req, res) => {
      const { book } = req;
      book.remove(err => {
        if(err) {
          return res.status(400).json({
            message: 'Book was not deleted'
          })
        };
        return res.sendStatus(204);
      });
    });
  
  return bookRouter;
}

module.exports = routes;