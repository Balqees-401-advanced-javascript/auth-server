'use strict';

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

  
}




module.exports = Model;