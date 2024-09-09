import Product from "../Models/Productmodel.js";
import { cloudinary } from "../Middleware/cloudinary.js";

const Addproduct= async (req,res) =>{
    try {
        const { name, category, price, description, image ,quantity } = req.body;
         

        // send the api request to the cloudinary to save the image
        
          const upim = await cloudinary.uploader.upload(image, {
            folder: 'AgroMart',
          });

          console.log(upim);
        const newProduct = new Product({
            name,
            category,
            price,
            quantity,
            description,
            image:{
              public_id:upim.public_id,
              url:upim.secure_url
            }
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
};


const getproduct = async (req, res) => {
    try {
      const products = await Product.find();
      await res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server Error' });}
    }


const updateproduct = async (req,res)=>{
  const id =req.params.id
  const { name, category, price, description, image ,quantity } = await req.body;
  console.log(quantity);

  try{
    const result = await Product.findByIdAndUpdate(
      id, 
      { name, category, price, description, image, quantity }, 
      { new: true }
    );
    
     res.json({ message: 'Product updated successfully'}); 
  }

  catch(err){
    res.status(500).json({ error: 'Failed to update product' });
  }
}


const searchproduct = async (req, res) => {
  const name = req.params.pname;

  try {
    const query = { name: { $regex: name , $options: "i" } };
      const searchp = await Product.find(query);
      
      if (searchp.length === 0) {
          res.status(204).send();
      } else {
          res.status(200).json(searchp); 
      }
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server Error' }); 
  }
};


const deleteproduct = async (req,res) =>{
  const id = req.params.id
  try{
     const result = await Product.findByIdAndDelete(id)
     res.json({ message: 'Product deleted successfully'});
  }
  catch(err){
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
}
    

export  {Addproduct,getproduct,deleteproduct,updateproduct,searchproduct};
