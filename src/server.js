'use stict';

const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('../src/auth/router');
const extraRoutes = require('./extra-routes');
const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.use(router);
app.use(extraRoutes);
app.use(cookieParser());

module.exports = {
  
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};
  