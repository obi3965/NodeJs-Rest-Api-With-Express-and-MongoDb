const jwt = require('jsonwebtoken')
const User = require('../database/models/userModle')
const AppError = require('../utils/AppError');

const signToken = id => {
      return jwt.sign({
            id
      }, process.env.JWT_SECRET, {
            expiresIn: process.env.jwt_EXPIRES_IN
      })
}
exports.signup = async (req, res, next) => {
      try {
            const newUser = await User.create(req.body)
            const token = signToken(newUser._id)

            res.status(201).json({
                  status: 'success',
                  token,
                  data: {
                        user: newUser
                  }
            })
      } catch (error) {
            console.log(error)
      }
}



exports.login = async (req, res, next) => {
      const {
            email,
            password
      } = req.body;
      try {
            //check if email and password is exist
            if (!email || !password) {
                  return next(Error);
            }

            //check if user is exist
            const user = await User.findOne({
                  email
            }).select('+password')


            if (!user || !(await user.correctPassword(password, user.password))) {
                  return next(Error)
            }
            console.log(user)
            //if everything is ok, send token to client
            const token = signToken(user._id);

            res.status(200).json({
                  status: 'success',
                  token
            })
      } catch (error) {
            console.log(error)
      }
}


exports.protect = asyn = (req, res, next) => {

      try {
            
            //Getting token and check of it is there
            let token;
           if(req.headers.authentication && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
           }
           console.log(token)
           if(!token){
                 return next(Error)
           }
            //verification token

            //check if user still exist


            //check if user changed password after the token was issued
            next()
      } catch (error) {
            res.status(500).json({
                  status:'error',
                  message:'log in '
            })
      }

}