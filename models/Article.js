// models/Book.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  journal_name: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  pages: {
    type: String,
    required: true
  },
  DOI: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Article = mongoose.model('article', ArticleSchema);