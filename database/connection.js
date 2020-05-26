const mongoose = require('mongoose');

module.exports = async () =>{
      try{
     await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true
      })
      console.log('database is connected')
      }catch(error){
          console.log('Database connection is error', error)
          throw new Error(error)
      }
     
}