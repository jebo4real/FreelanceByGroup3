const keyPublishable = 'pk_test_cGawfDbRwNlwGc7L9OHxVLwB00AvTIgTkg';
const keySecret = 'sk_test_RDIoGjkXBg7304rnk6NaypWd00MxIWl5U4';
const stripe = require("stripe")(keySecret);
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const UserPaymentInfo = require('../../models').UserPaymentInfo;
const crypto = require('crypto');
let secret = "group3";

module.exports.GetPaymentDetails = async (req, res, next) => {
    let user_payment = await UserPaymentInfo.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.UserPaymentInfo  = user_payment;
    res.render(
        'profile/payment-details',
        {
            page:'payment',
            success:'',
            error:''
        }
    )
};

module.exports.CreateStripeAccount = async (req, res, next) => {
    let user_payment = await UserPaymentInfo.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.UserPaymentInfo  = user_payment;
    let account_obj = {
        type: 'custom',
        country: 'US',
        email: res.locals.user.UserAccount.email,
        individual:{
          id_number:"000000000",
          first_name: res.locals.user.firstname,
          last_name:  res.locals.user.lastname,
          dob: {
              day:"01",
              month:"01",
              year:"1901"
          },
          phone: "000 000 0000",
          email:"jamin@gmail.com",
          ssn_last_4:"0000",
          address: {
              line1: "address_full_match",
              city: "New york",
              state: "New York",
              country: "US",
              postal_code: "10001",
           },
           verification: {
            document: {
                // back: "file_identity_document_success",
                front: "file_identity_document_success"
            }
        },
        },
        business_profile: {
            mcc: "5734",
            url: "www.yesuayebigh.com"
        },
        external_account:{
          object:"bank_account",
          country: "US",
          currency: "usd",
          routing_number:"110000000",
          account_number:"000123456789",
        },
        tos_acceptance: {
          date: "1547923073",
          ip: "172.18.80.19",
        },
        business_type: "individual",
        requested_capabilities: [
          'card_payments',
          'transfers'
        ],
      };
      stripe.accounts.create(account_obj).then(accounts=>{
          console.log(accounts);
        let paymentdetails = {
            UserId: res.locals.user.id,
            accountNumber:accounts.id
        };
        let check_if_exisits = UserPaymentInfo.findOne({where:{UserId:res.locals.user.id}});
        let user_pay = {};
        if(check_if_exisits!==null){
            user_pay = UserPaymentInfo.update(paymentdetails,{where:{UserId:res.locals.user.id}});
        }else{
            user_pay = UserPaymentInfo.create(paymentdetails);
        }
        res.render(
            "profile/payment-details",
            {
                page:'payment',
                success:'Stripe Account Created and Payment Details Added',
                error:'',
                accountNumber:accounts.id,
            }
        )
      });
};

module.exports.AddPaymentDetails = async (req, res, next) => {
    let user_payment = await UserPaymentInfo.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.UserPaymentInfo  = user_payment;
    let paymentdetails = {
        UserId: res.locals.user.id,
        accountNumber:req.body.account_id
    };
    let check_if_exisits = await UserPaymentInfo.findOne({where:{UserId:res.locals.user.id}});
    let user_pay = {};
    if(check_if_exisits!==null){
        user_pay = await UserPaymentInfo.update(paymentdetails,{where:{UserId:res.locals.user.id}});
    }else{
        user_pay = await UserPaymentInfo.create(paymentdetails);
    }
    res.render(
        "profile/payment-details",
        {
            page:'payment',
            success:'Payment Details Added',
            error:''  
        }
    )
};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};