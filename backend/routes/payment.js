const { startPayment, checkPaymentStatus } = require("../controllers/payment");

const router = require("express").Router();

router.get("/initiate/:amount", startPayment);
router.route("/redirect").post( (req, res) => {
  console.log(req.body.code,req.body.amount);
  // return res.send(req.body.code);
  const status = {
    PAYMENT_SUCCESS: process.env.FRONTEND_URL_FOR_SUCCESSFUL_PAYMENT,
    PAYMENT_ERROR: process.env.FRONTEND_URL_FOR_FAILED_PAYMENT,
    // PAYMENT_PENDING: "https://www.wundrsight.com/payment-pending", // if payment is pending then check the status by calling checkPaymentStatus and accordingly send the message to the client
  };
  const { code } = req.body;
  if (!status[code]) {
    console.log("Payment failed: " + code);
    return res.redirect(process.env.FRONTEND_URL_FOR_FAILED_PAYMENT);
  }

  return res.redirect(status[code]);
}).get((req, res) => {
  
  return res.redirect(process.env.FRONTEND_URL_FOR_SUCCESS_PAYMENT);
  
});
router.route("/callback").post((req, res) => {
  console.log("req .body , ", req.body);
  return res.send(res.body);
});

router.get("/status", checkPaymentStatus);
module.exports = router;
