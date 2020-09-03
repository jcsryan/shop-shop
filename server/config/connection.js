const mongoose = require('mongoose');
const MONGOD_URI = 'mongodb+srv://jcsryan:Butcher12@cluster0.nx8om.mongodb.net/Shop-Shop?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI || 'mongodb://localhost/mernshopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
