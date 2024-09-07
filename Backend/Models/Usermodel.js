import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userschema = new Schema({
   username: { type: String, required: true, unique: true },
   role: { type: String, default: 'user' },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   phonenumber: { type: Number }, 
   Address: { type: String },
});


userschema.statics.createUser = async function(username, email, password) {
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new this({ username, email, password: hashedpassword, role: 'user' });
    return user.save();
};

export default mongoose.model('User', userschema);
