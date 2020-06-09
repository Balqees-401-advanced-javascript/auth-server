'use strict';
const jwt = require('jsonwebtoken');

class Model {
  constructor(schema){
    this.schema = schema;
  }

  post(record){
    
    let newRecord = new this.schema(record);
    return newRecord.save();
   
  }
  
  read(userName){
    if(userName){  
      // console.log('hiiiiiiii',this.schema.find({userName}));
      return this.schema.find({userName});
        
    }
    else {return this.schema.find({});}
  }

  verifyToken(token){
    let that = this;
    // console.log('toooooooooken',token);
    // console.log('seeeeeeeeeecret',process.env.SECRET);
    return jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        console.log('err>>> ', err);
        return Promise.reject(err);
      }
      // console.log('decoded >>>> ',decoded); // {username: usernameValue, ...}
      let userName = decoded['username']; // decoded.username
      // console.log(userName);
      return that.schema.find({userName})
        .then(result =>{
          if (result.length) {
            return Promise.resolve(result[0]);
          } 
          return Promise.reject();
        });
    });
  }
}




module.exports = Model;