import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity:Number,
    description: String,
    image:{
        public_id:{
            type:String,
            require:true
        },
        url:{
          type:String,
          require:true
        }
    },})

const Product = mongoose.model('Product', ProductSchema);

export default Product;