import payment_details from "../Models/payamentdetailsmodel.js";



const addpaymentdetails = async (req,res)=>{
    
try{
    const {userid,cardname,cardnumber,totalamount} =req.body
    const paymentdetails =new payment_details ({
        cardname,
        cardnumber,
        userid,
        totalamount
    })

    await paymentdetails.save();
    res.status(201)
}
catch(error){
    res.status(400)
}
}

const getpaymentdetails = async(req,res)=>{
    try{
    const paymentdata = await payment_details.find()
    res.status(201).json(paymentdata);
    }

    catch(error){
        res.status(400);
    }

}

export {getpaymentdetails,addpaymentdetails};