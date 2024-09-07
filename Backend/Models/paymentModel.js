import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    userId: { type: String, required: false }
});

export default mongoose.model('payment', paymentSchema);