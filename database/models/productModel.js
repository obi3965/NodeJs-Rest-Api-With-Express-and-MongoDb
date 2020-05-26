const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
      name:String,
      price:Number,
      brand:String
},
{
      timestamp: true,
      
      
}
)
//get rid off _id
productSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
const Product = mongoose.model('Product', productSchema)
 
 module.exports = Product