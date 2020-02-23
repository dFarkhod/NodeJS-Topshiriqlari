const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDBga ulanish hosil qilindi...'))
  .catch((err) => console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err));

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

const bookSchema = new mongoose.Schema({
  title: String,
  authors: {
    type: [authorSchema],
    required: true
  }
})

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

async function createBook(title, authors) {
  const book = new Book({
    title,
    authors: authors
  });

  const result = await book.save();
  console.log(result);
}

createBook('NodeJS - To\'liq qo\'llanma', [
  new Author({
    firstName: 'Farkhod',
    lastName: 'Dadajanov',
    email: 'dfarkhod@gmail.com'
  }),
  new Author({
    firstName: 'Ibrohim',
    lastName: 'Dadajanov',
    email: 'abc@gmail.com'
  })
]
);

// async function updateAuthor(bookId) {
//   await Book.updateOne({ _id: bookId }, {
//     $unset: {
//       'author': ''
//     }
//   });
// }

//updateAuthor('5e516acf217e2e166053a552');
