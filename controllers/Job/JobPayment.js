const paypal = require('paypal-rest-sdk');
const JobPayment = require('../../models').JobPayment;

paypal.configure({
    'mode': 'sandbox', //sandbox
    'client_id': 'AaU8tQfmz1_MFDTKuf84yYERXvdDt2ZFJVrxhNW_49DazF4A_F0VBuKyV5_nntyEdZqUa5Oq9ZBj65GV',
    'client_secret': 'EAZ8aFDU4lHHLy1bQqULYWqznf3dBknXZW3AH__zFC0bUs8AGUyR6RNbm-jHvqtikX7PsSqMO5vxuvKm'
});

module.exports.MakePayment = async (req,res, next) =>{
    let paymentDetails = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      JobId: req.body.JobId
    };
    res.locals.price = paymentDetails.price;
    res.locals.JobId = paymentDetails.JobId;
    //create payment request
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": paymentDetails.name,
                    "sku": "job",
                    "price": paymentDetails.price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": paymentDetails.price
            },
            "description": paymentDetails.description
        }]
    };

    //initiate payment
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

};

module.exports.success = (req, res, next) =>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    //payment json
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": res.locals.price
            }
        }]
    };

    //execute payment
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            let paymentInfo = {
              clientPaymentReceipt: paymentId,
              clientPay: true,
              freelancePay: false,
              JobId: res.locals.JobId
            };
            let job_payment = JobPayment.create(paymentInfo);
            if(job_payment!==null){
                res.send('Success');
            }
        }
    });
};

module.exports.cancel = (req, res, next) =>{
    res.redirect("/user/");
};