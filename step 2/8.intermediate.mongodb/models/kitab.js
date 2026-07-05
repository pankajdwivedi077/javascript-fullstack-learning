const mongoose = require('mongoose');

const KitabSchma = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})

module.exports = mongoose.model("Kitab", KitabSchma);