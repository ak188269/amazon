const axios = require('axios');
const crypto = require('crypto');

const asyncErrorHandler = require('../utils/asyncErrorHandler');
const generateMerchantTransactionId = require('../utils/generateMerchantTransactionId');
const baseUrl = process.env.NODE_ENV == 'production'? "https://amazon-website-backend.vercel.app/" : "http://localhost:8080" ;


// const process.env.PHONEPE_SALT_KEY = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
// const PHONEPE_MERCHANT_ID = 'PGTESTPAYUAT';
// const process.env.PHONEPE_SALT_KEY_INDEX = 1;
const startPayment = asyncErrorHandler( async (req, res , next) => {
    // res.send(process.env.PHONEPE_MERCHANT_ID);
    // return;
    const merchantTransactionId = generateMerchantTransactionId();
    const {amount} = req.params ;  // in ruppes
    const payload = {
        "merchantId": process.env.PHONEPE_MERCHANT_ID,  // Note: merchantId length will be less than 38 characters.
        "merchantTransactionId": merchantTransactionId, //merchantTransactionId length should be less than 36 characters - No Special characters allowed except underscore "_" and hyphen "-"
        "merchantUserId": "MUID123",
        "amount": amount*100, // in paise 
        "redirectUrl": baseUrl+"/api/v1/payment/redirect",
        // "redirectMode": "REDIRECT",
        "redirectMode": "POST",
        "callbackUrl": baseUrl+"/api/v1/payment/callback",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
          "type": "PAY_PAGE"
        }
      }
    const jsonString = JSON.stringify(payload);
// Step 2: Encode the string to Base64
const base64Payload = Buffer.from(jsonString).toString("base64");

const concatenatedString = `${base64Payload}/pg/v1/pay${process.env.PHONEPE_SALT_KEY}`;

// Calculate the SHA-256 hash
const checkSum = crypto
  .createHash('sha256')
  .update(concatenatedString)
  .digest('hex')+`###${process.env.PHONEPE_SALT_KEY_INDEX}`;

// console.log(checkSum);
// console.log(base64Data);
const body = {
	"request":base64Payload,
}

const url =  'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';  // this is test url
// const url =  ' https://api.phonepe.com/apis/hermes/pg/v1/pay';   // this is production url 
const config = {
  headers: {accept: 'application/json', 'Content-Type': 'application/json',"X-VERIFY":checkSum},
};

const {data} = await axios
  .post(url ,body , config)

  const redirectUrl = data.data?.instrumentResponse?.redirectInfo?.url ;
  if(redirectUrl)
  // return res.redirect(redirectUrl);
  return res.send({data});

})

const checkPaymentStatus = asyncErrorHandler ( async (req , res  , next) => {
    const merchantTransactionId = "MT7850590068188108";
    const url = `
    https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`
    
    const concatenatedString = `/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}${process.env.PHONEPE_SALT_KEY}`;

// Calculate the SHA-256 hash
const checkSum = crypto
  .createHash('sha256')
  .update(concatenatedString)
  .digest('hex')+`###${process.env.PHONEPE_SALT_KEY_INDEX}`;

  const config = {
    headers: {accept: 'application/json', 'Content-Type': 'application/json',"X-VERIFY":checkSum,"X-MERCHANT-ID":process.env.PHONEPE_MERCHANT_ID},
  };
  
    const {data} = await axios.get(url,config);

    return res.send(data);

});
module.exports = {
    startPayment,
    checkPaymentStatus
};