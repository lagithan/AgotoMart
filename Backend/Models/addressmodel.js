import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressschema = new Schema({
   userid: { type: String, required: true, unique:true },
   address1: { type: String},
   address2: { type: String },
   address3: { type: String}
    
});

export default mongoose.model('address', addressschema);