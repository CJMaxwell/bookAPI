const mongoose = require('mongoose');
// const timestamp = require('mongoose-timestamp');

const { Schema } = mongoose;

const BookSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  imageLink: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true,
    default: 'http://localhost:5000'
  },
  pages: {
    type: Number,
    required: true,
    default: 0
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);