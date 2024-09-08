import payment from './../Models/paymentModel.js';

const addPayment = async (req, res) => {
  console.log(req.body)
  try {
    const { userid, cardName, cardNumber, expiryDate, cvv } = req.body;
    const paymentMethod = new payment({
      cardName,
      cardNumber,
      expiryDate,
      cvv,
      userId: userid,
    })
    await paymentMethod.save();
    res.status(201).send(paymentMethod);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getproduct = async (req, res) => {
  const userid = req.params.userid;

  try {
    const query = { userId: userid };
    const searchp = await payment.find(query);

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
//   const updatePaymentMethod = async (req,res)=>{
//     const userid =req.params.id;
//     const { cardName, cardNumber, expiryDate, cvv } = req.body;

//     try{
//       const updatedPayment = await payment.findOneAndUpdate(
//         {userId:userid}, 
//         { cardName, cardNumber, expiryDate, cvv },
//         { new: true }
//       );

//        res.json({ message: 'Product updated successfully'}); 
//     }

//     catch(err){
//       res.status(500).json({ error: 'Failed to update product' });
//     }
//   }
const updatePaymentMethod = async (req, res) => {
  const { id } = req.params; // This should be a unique identifier for the payment method
  const { cardName, cardNumber, expiryDate, cvv } = req.body;

  try {
    const updatedPayment = await payment.findOneAndUpdate(
      { _id: id }, // Use the unique payment method ID
      { cardName, cardNumber, expiryDate, cvv },
      { new: true }
    );

    res.json({ message: 'Payment method updated successfully', updatedPayment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment method' });
  }
};

const deletepaymentMethod = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  if (!id) {
    return res.status(400).json({ error: 'No payment method ID provided' });
  }

  try {
    const deletePayment = await payment.findByIdAndDelete(id)
    if (deletePayment) {
      res.json({ message: 'Payment method deleted successfully' });
    } else {
      res.status(404).json({ message: 'Payment method not found' });
    }
  }
  catch (err) {
    console.error('Error occurred while deleting payment method:', err);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
}


export { addPayment, getproduct, updatePaymentMethod, deletepaymentMethod };
