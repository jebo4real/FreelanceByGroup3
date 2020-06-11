const keyPublishable = 'pk_test_cGawfDbRwNlwGc7L9OHxVLwB00AvTIgTkg';
const keySecret = 'sk_test_RDIoGjkXBg7304rnk6NaypWd00MxIWl5U4';
const stripe = require("stripe")(keySecret);
const Job = require('../../models').Job;
const JobPayment = require('../../models').JobPayment;
const UserPaymentInfo = require('../../models').UserPaymentInfo;

module.exports.Pay = (req, res, next) =>{
    let amount = Math.round(parseInt(req.body.amount)*100);
    console.log(amount);
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: res.locals.user.firstname + " " + res.locals.user.lastname,
        address: {
            line1: res.locals.user.city,
            postal_code: '',
            city: res.locals.user.city,
            state: res.locals.user.city,
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
            console.log(charge);
            let payment_details = {
                JobId: req.body.JobId,
                amount: charge.amount,
                clientPaymentReceipt:charge.balance_transaction,
                clientPay: true
            };
            let client_pay = JobPayment.create(payment_details);
            res.render("job/success-payment",{amount:req.body.amount,jobname:res.locals.jobName});  // If no error occurs
        })
        .catch((err) => {
            console.log(err);
            res.render("job/error-payment",{amount:req.body.amount,jobname:res.locals.jobName});// If some error occurs
        });
};

module.exports.GetPaid = async (req, res, next)=>{
    let amount = Math.round(parseInt(req.body.amount)*100);
    amount = amount - ((15/100)*amount);
    UserPaymentInfo.findOne({where:{UserId:res.locals.user.id} }).then(userP=>{
        stripe.accounts.retrieve(userP.accountNumber).then(accounts=>{     
            stripe.payouts.create({
                amount,
                currency:"usd",
                // source_type:source_type,
                // destination:bank_acount_id
            },{ stripeAccount:accounts.id}).then((payouts)=>{
                console.log(payouts);
                console.log("success");

                let payment_details = {
                    free_amount: amount,
                    freelancePay: true
                };
                let feee_pay = JobPayment.update(payment_details,{where:{JobId:req.body.JobId} });
                res.render("job/success-payment",{amount:req.body.amount,jobname:res.locals.jobName});  // If no error occurs
            }).catch((err)=>{
                console.log(err);
                res.render("job/error-payment",{amount:req.body.amount,jobname:res.locals.jobName});// If some error occurs
            });
        }).catch(e=>{
            console.log(e);
            res.render("job/error-payment",{amount:req.body.amount,jobname:res.locals.jobName});
        });
    }).catch(e=>{
        console.log(e);
        res.render("job/error-payment",{amount:req.body.amount,jobname:res.locals.jobName});
    });  
};