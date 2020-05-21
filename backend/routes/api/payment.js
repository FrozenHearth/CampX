const router = require('express').Router();
const Razorpay = require('razorpay');
const Payment = require(`../../models/payment`);
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: process.env.razorpay_key_id,
  key_secret: process.env.razorpay_key_secret
});

router.post('/', (req, res) => {
  let userId = req.body.userId;
  let options = {
    amount: req.body.amount,
    currency: 'INR',
    receipt: process.env.receipt
  };

  instance.orders.create(options, (err, order) => {
    order.receipt = order.id;
    res.status(200).json({ order, userId });
    if (err) {
      res.status(500).json({ Error: err });
      console.log(err);
    }
  });
});

router.post('/success', (req, res) => {
  let payment = new Payment({
    razorpay_payment_id: req.body.razorpay_payment_id,
    razorpay_order_id: req.body.razorpay_order_id,
    razorpay_signature: req.body.razorpay_signature,
    _owner: {
      userId: req.body.userId,
      firstName: req.body.firstName
    },
    _author: {
      userId: req.body.authorId
    },
    paidOn: new Date(),
    campgroundId: req.body.campgroundId,
    status: 1
  });

  let secret = process.env.razorpay_key_secret;
  let hmac = crypto.createHmac('sha256', secret);
  //passing the data to be hashed
  let data = hmac.update(
    payment.razorpay_order_id + '|' + payment.razorpay_payment_id
  );
  // Creating the hmac in the required format
  let generated_signature = data.digest('hex');
  //Printing the output on the console
  payment.save();
  
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, campgroundId, _id, status } = payment;

  res.status(200).json({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId: payment._owner.userId,
    firstName: payment._owner.firstName,
    status,
    _id,
    paidOn: payment.paidOn,
    userId: payment._owner.userId,
    authorId: payment._author.userId,
    firstName: payment._owner.firstName,
    campgroundId
  });
});

router.get('/:userId', (req, res) => {
  Payment.findOne({ campgroundId: req.params.userId })
    .then(response => {
      if (response === null) {
        return;
      } else {
        res.status(200).json({ paymentDetails: response });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: err });
    });
});

module.exports = router;
