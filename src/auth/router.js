'use strict';
const express = require('express');
const router = express.Router();
const users = require('../auth/models/users-model');
const model = require('../auth/models/user-model.collection');
const autMiddleWare = require('../auth/middleware/basic');

router.post('/signup',addUser);
router.post('/signin',autMiddleWare,logIn);
router.post('/users',getAllUser);


function addUser(req,res,next){
  let user = req.body;

  model.read(user.userName).then(result => {
    if (result.length < 1 || result == undefined){
      model.post(user).then(result => {
        res.status(200).send(result);
      }); 
    }
    else{ return res.send('invalid');}

  });
}   

function logIn(req,res,next){
  
  res.status(200).json({token :req.token ,userData: req.body});
  
}

function getAllUser(req,res,next){
  model.read().then(result =>{
    res.status(200).json({users :result});
  });
 
}



// req.headers.authorization
module.exports = router;