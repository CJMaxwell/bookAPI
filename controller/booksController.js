function booksController(Book) {
  function post(req, res){
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  };
  function get(req,res){
    Book.find((err, books) => {
      if(err) {
        return res.status(404).send(err);
      };
      return res.status(200).json(books);
    });
    
  }

  return { get, post }
}

module.exports = booksController;