const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
      name:{
            type:String,
            required:[true, 'Please Enter Your Name']
      },
      email:{
            type:String,
            required:[true, 'Please Enter Your Email'],
            unique:true,
            lowercase:true,
            validate:[validator.isEmail, 'Please a valid Email'] 
      },
      photo: String,

      password:{
            type:String,
            required:[true, 'Please Enter Your password'],
            minlength: 8,
            select:false
      },
      passwordConfirm:{
            type:String,
            required:[true, 'Please Enter Your confrim password'],
            validate:{
                  //This only works for create and save
                  validator: function(el){
                        return el === this.password;
                  },
                  message:'password are not the same'
            }
            
      }
      
});

userSchema.pre('save', async function(next){
      //only run this func if password is modified
      if(!this.isModified('password'))
      return next();
      //hash the password with cost of 12
      this.password = await bcrypt.hash(this.password, 12)
      //delete password confirm
      this.passwordConfirm = undefined;
      next()
})

  userSchema.methods.correctPassword = async function( candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword, userPassword)
  }


  //get rid off _id
  userSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
const User = mongoose.model('User', userSchema)
 
 module.exports = User