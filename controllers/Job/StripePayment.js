const keyPublishable = 'pk_test_cGawfDbRwNlwGc7L9OHxVLwB00AvTIgTkg';
const keySecret = 'sk_test_RDIoGjkXBg7304rnk6NaypWd00MxIWl5U4';
const stripe = require("stripe")(keySecret);

module.exports.Pay = (req, res, next) =>{
// Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: res.locals.user.firstname + " " + res.locals.user.lastname,
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: res.locals.user.city,
            state: res.locals.user.country,
            country: res.locals.user.country,
        }
    })
        .then((customer) => {
            return stripe.charges.create({
                amount: 321,
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