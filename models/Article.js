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
  source: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    default: Date.now
  },
  claim: {
    type: String,
    required: true
  },
  evidence: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  DOI: {
    type: String,
    required: true
  },
  types: {
    type: String,
    required: true
  }
});

module.exports = Article = mongoose.model('article', ArticleSchema);