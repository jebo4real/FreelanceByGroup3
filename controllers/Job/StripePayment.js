const keyPublishable = 'pk_test_cGawfDbRwNlwGc7L9OHxVLwB00AvTIgTkg';
const keySecret = 'sk_test_RDIoGjkXBg7304rnk6NaypWd00MxIWl5U4';
const stripe = require("stripe")(keySecret);
const Job = require('../../models').Job;

module.exports.Pay = (req, res, next) =>{
    let amount = Math.round(parseInt(req.body.amount)*100);
    console.log(amount);
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: res.locals.user.firstname + " " + res.locals.user.lastname,
        address: {
            line1: 'Takoradi',
            postal_code: '452331',
            city: res.locals.user.city,
            state: res.locals.user.country,
            country: res.locals.user.country,
        }
    }).then((customer) => {
            return stripe.charges.create({
                amount: amount,
                description: res.locals.jobName,
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            console.log("success");
            res.render("job/success-payment");  // If no error occurs
        })
        .catch((err) => {
            console.log(err);
            res.render("job/error-payment");// If some error occurs
        });
};

module.exports.GetPaid = async (req, res, next)=>{
    let amount = Math.round(129*100);
    stripe.customers.create({
        email: "jeboelectroneum@gmail.com",
        name: "nana kofi",
        address: {
            line1: 'Takoradi',
            postal_code: '02332',
            city: "Takoradi",
            state: "Western",
            country: "Ghana",
        }
    }).then((customer) => {
        console.log(customer);
        // stripe.payouts.create({
        //     amount: amount,
        //     description: res.locals.jobName,
        //     destination: customer.id, 
        //     currency: 'USD'
        // }).then((payout)=>{
        //     console.log(payout);
        // }).catch((err)=>{
        //     console.log(err);
        // });
    });
        
};