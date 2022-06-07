const mongoose = require('mongoose');
const consts = require('../consts');

mongoose.connect(consts.MONGO_API_URL)
  .then(() => {
    console.log('mongoconnected');
  });
mongoose.Promise = global.Promise;

module.exports = mongoose;
