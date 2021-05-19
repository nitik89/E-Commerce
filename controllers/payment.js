const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "yjbk4qr2xt7rsbgt",
    publicKey: "8np49vf2z6d2qstv",
    privateKey: "0f4b630f548a4ec7a71372ed0ba85665"
});

exports.getToken = (req, res) => {


    gateway.clientToken.generate({},
        (err, response) => {

            if (err) {
                res.status(500).send(err)
            } else {

                res.send(response);
            }
        });

}
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    console.log(nonceFromTheClient)
    let amountFromClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });

}