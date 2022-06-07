'use strict'

const mongoose = require('../database/mongodb')

const HeaderSchema = new mongoose.Schema({
    title: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    urls: [
      {
        url: {
                  type: String,
                  required: false,
              },
              description: {
                  type: String,
                  required: false,
              }
      },
    ],
    topLanguages: [String],
    topTags: [String],
    topUsers: {
      type: Array,
      required: false,
    },
  });
  
  
  module.exports = HeaderSchema;