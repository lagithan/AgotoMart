import mongoose from "mongoose";

const paymentdetails_schema = new mongoose.Schema({
    userid :{type:String},
    cardname:{type:String},
    cardnumber:{type:Number},
    totalamount:{type:Number},
    createdAt: { type: Date, default: Date.now },
});

const payment_details=mongoose.model('Payment_details',paymentdetails_schema)

export default payment_details;