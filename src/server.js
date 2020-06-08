'use stict';

const express = require('express');
const router = require('../src/auth/router');


const app = express();

app.use(express.json());
app.use(router);
app.use(express.static('./public'));
module.exports = {
  
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};
  