const Product = require('../database/models/productModel')
const authController = require('../controllers/authController')
const AppError = require('../utils/AppError');

exports.getProduct = async (req,res,next) =>{
      try{
            const allProducts = await Product.find()
            
            res.status(200).json({
                  data:{
                        product:allProducts
                  }
            })
            }catch(error){
              console.log(error)
            }
}


exports.createProduct = async (req,res,next) =>{
     try{
     const newProduct = await Product.create(req.body)
     
     res.status(200).json({
           data:{
                 product:newProduct
           }
     })
     }catch(error){
       console.log(error)
     }
} 

exports.getSingleProduct = async (req,res,next) =>{
      const singleProductId  = req.params.id;
      try{  
            const singleProduct = await Product.findById(singleProductId) 
            res.status(200).json({
                  data:{
                        singleProduct
                  }
            })
            }catch(error){
              console.log(error)
            }
}


exports.updateProduct = async (req,res,next) =>{
      const updateProductById  = req.params.id;
      const updateProductByBody  = req.body;
      try{  
            const singleProductUpdate = await Product.findByIdAndUpdate(updateProductById, updateProductByBody) 
            res.status(200).json({
                  data:{
                        singleProductUpdate
                  }
            })
            }catch(error){
              console.log(error)
            }
}



exports.deleteProduct = async (req,res,next) =>{
      const deleteProductById  = req.params.id;
      
      try{  
            const singleProductdelete = await Product.findByIdAndDelete(deleteProductById) 
            res.status(200).json({
                  data:{
                        singleProductdelete
                  }
            })
            }catch(error){
              console.log(error)
            }
}