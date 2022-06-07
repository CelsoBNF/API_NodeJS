'use strict'

const mongoose = require('../database/mongodb')

const PinnedSchema = new mongoose.Schema({
  repository: {
    type: String,
    required: false,
  },
	url: {
    type: String,
    required: false,
  },
	description: {
    type: String,
    required: false,
  },
	language: {
    type: String,
    required: false,
  },
	stars: {
    type: String,
    required: false,
  },
	forks: {
    type: String,
    required: false,
  },
});

module.exports = PinnedSchema;