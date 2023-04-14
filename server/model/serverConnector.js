const mongoose = require('mongoose');

function db(){ mongoose.connect('mongodb://127.0.0.1:27017/crudR')
  .then(() => console.log('Server Connected!'));}

  module.exports=db