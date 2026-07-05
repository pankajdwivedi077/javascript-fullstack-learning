const mongoose = require('mongoose');

const AuthorSchma = new mongoose.Schema({
  name: String,
  bio: String
})

module.exports = mongoose.model("Author", AuthorSchma);