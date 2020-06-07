'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');


let port = process.env.PORT;
const dbUrl = process.env.DB_URI; 

const mongooseOption = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(dbUrl,mongooseOption);
server.start(port);


