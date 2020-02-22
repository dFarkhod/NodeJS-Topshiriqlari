const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDBga ulanish hosil qilindi...'))
  .catch((err) => console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
}));

const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(firstName, lastName, email) {
  const author = new Author({
    firstName,
    lastName,
    email
  });

  const result = await author.save();
  console.log(result);
}

async function createBook(title, authorId) {
  const book = new Book({
    title: title,
    author: authorId
  });

  const result = await book.save();
  console.log(result);
}

async function listBooks() {
  const book = await Book
    .find()
    .populate('author', 'firstName -_id')
    .select('title author');
  console.log(book);
}

//createAuthor('Farkhod', 'Dadajanov', 'dfarkhod@gmail.com');

//createBook('NodeJS - To\'liq qo\'llanma', '5e50bcc530b7b830e4ace837')

listBooks();