'use strict';
require('dotenv').config();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models/user-model.collection');

module.exports = async (req,res ,next) => {
  if (!req.headers.authorization) {
    next('invalid Login');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();

  let [userName, pass] = base64.decode(basic).split(':'); 
  // console.log('sondooooooooooos',userName);
  model.read(userName).then(async result =>{
    // console.log('resultttttttttt', result);
    let valid = await bcrypt.compare(pass, result[0].password);
    if(valid){
      // console.log('ggfgfgfggfgff',result[0].userName );
      // console.log('kkkkkkkkkkkkk',process.env.SECRET );
      let token = jwt.sign({username: result[0].userName}, process.env.SECRET ,{expiresIn:900000});
      req.token = token;
      req.body =result;
      next();
    }
    // next('Invalid Login!!');
  });
};